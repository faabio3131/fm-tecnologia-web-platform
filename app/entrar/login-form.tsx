"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { IronFitTenantOption } from "@/src/lib/iron-fit/auth-contract";

function safeNext(value: string | null) {
  return value?.startsWith("/app/iron-fit") ? value : "/app/iron-fit";
}

export function IronFitLoginForm() {
  const searchParams = useSearchParams();
  const destination = useMemo(() => safeNext(searchParams.get("next")), [searchParams]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenants, setTenants] = useState<IronFitTenantOption[]>([]);
  const [gymId, setGymId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/iron-fit/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, ...(gymId ? { gymId } : {}) }),
      });
      const data = (await response.json()) as {
        error?: string;
        requires_tenant_selection?: boolean;
        tenants?: IronFitTenantOption[];
      };
      if (!response.ok) {
        setError(data.error ?? "Não foi possível entrar.");
        return;
      }
      if (data.requires_tenant_selection) {
        const options = data.tenants ?? [];
        setTenants(options);
        setGymId(options[0]?.id ?? "");
        return;
      }
      window.location.assign(destination);
    } catch {
      setError("Não foi possível conectar ao IRON FIT.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="iron-login-form" onSubmit={submit} noValidate>
      <label>
        <span>E-mail</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          maxLength={254}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={busy || tenants.length > 0}
        />
      </label>
      <label>
        <span>Senha</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          maxLength={256}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={busy || tenants.length > 0}
        />
      </label>
      {tenants.length > 0 && (
        <label>
          <span>Academia / unidade</span>
          <select value={gymId} onChange={(event) => setGymId(event.target.value)} required disabled={busy}>
            {tenants.map((tenant) => (
              <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
            ))}
          </select>
        </label>
      )}
      {error && <p className="iron-login-error" role="alert">{error}</p>}
      <button className="button button--primary" type="submit" disabled={busy || (tenants.length > 0 && !gymId)}>
        {busy ? "Validando…" : tenants.length > 0 ? "Entrar nesta unidade" : "Entrar no IRON FIT"}
      </button>
      {tenants.length > 0 && (
        <button
          className="iron-login-link"
          type="button"
          onClick={() => { setTenants([]); setGymId(""); setError(""); }}
          disabled={busy}
        >
          Voltar
        </button>
      )}
    </form>
  );
}
