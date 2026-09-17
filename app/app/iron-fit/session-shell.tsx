"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IronFitSessionUser } from "@/src/lib/iron-fit/auth-contract";
import { hasAnyRole, IronFitSessionProvider } from "@/src/lib/iron-fit/session-context";
import styles from "./iron-fit-shell.module.css";

type SessionState =
  | { kind: "loading" }
  | { kind: "ready"; user: IronFitSessionUser }
  | { kind: "error"; message: string };

const navigation = [
  { href: "/app/iron-fit", label: "Visão geral", roles: ["OWNER", "MANAGER", "RECEPTION", "TRAINER"] },
  { href: "/app/iron-fit/dashboard", label: "Dashboard", roles: ["OWNER", "MANAGER"] },
  { href: "/app/iron-fit/alunos", label: "Alunos", roles: ["OWNER", "MANAGER", "RECEPTION", "TRAINER"] },
  { href: "/app/iron-fit/avaliacoes", label: "Avaliações", roles: ["OWNER", "MANAGER", "RECEPTION", "TRAINER"] },
  { href: "/app/iron-fit/treinos", label: "Treinos", roles: ["OWNER", "MANAGER", "TRAINER"] },
  { href: "/app/iron-fit/agenda", label: "Agenda", roles: ["OWNER", "MANAGER", "RECEPTION", "TRAINER"] },
  { href: "/app/iron-fit/acessos", label: "Acesso", roles: ["OWNER", "MANAGER", "RECEPTION"] },
  { href: "/app/iron-fit/financeiro", label: "Financeiro", roles: ["OWNER", "MANAGER", "RECEPTION"] },
];

async function getSession() {
  return fetch("/api/iron-fit/auth/session", { cache: "no-store" });
}

export function IronFitSessionShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [state, setState] = useState<SessionState>({ kind: "loading" });

  const load = useCallback(async () => {
    setState({ kind: "loading" });
    try {
      let response = await getSession();
      if (response.status === 401) {
        const refreshed = await fetch("/api/iron-fit/auth/refresh", { method: "POST" });
        if (refreshed.ok) response = await getSession();
      }
      if (response.status === 401 || response.status === 403) {
        window.location.replace(`/entrar?next=${encodeURIComponent(window.location.pathname + window.location.search)}`);
        return;
      }
      const data = (await response.json()) as { user?: IronFitSessionUser; error?: string };
      if (!response.ok || !data.user) {
        setState({ kind: "error", message: data.error ?? "Não foi possível validar a sessão." });
        return;
      }
      setState({ kind: "ready", user: data.user });
    } catch {
      setState({ kind: "error", message: "Não foi possível conectar ao IRON FIT." });
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  async function logout() {
    try { await fetch("/api/iron-fit/auth/logout", { method: "POST" }); } finally { window.location.replace("/entrar"); }
  }

  if (state.kind === "loading") return <main className={styles.loading}><p>Validando sessão segura…</p></main>;
  if (state.kind === "error") return <main className={styles.error}><div><p>{state.message}</p><button className={styles.button} onClick={() => void load()}>Tentar novamente</button></div></main>;

  const { user } = state;
  const availableNavigation = navigation.filter((item) => hasAnyRole(user, item.roles));

  return (
    <IronFitSessionProvider user={user}>
      <div className={styles.shell}>
        <aside className={styles.sidebar} aria-label="Navegação IRON FIT">
          <div className={styles.brand}><strong>IRON FIT CORE</strong><span>Operação Web</span></div>
          <nav className={styles.nav}>
            {availableNavigation.map((item) => {
              const active = item.href === "/app/iron-fit" ? pathname === item.href : pathname.startsWith(item.href);
              return <Link key={item.href} className={active ? styles.active : undefined} href={item.href}>{item.label}</Link>;
            })}
          </nav>
          <div className={styles.sidebarFooter}>
            <div className={styles.muted}>Tenant ativo</div>
            <strong>{user.activeGymId ?? "Escopo global"}</strong>
          </div>
        </aside>
        <main className={styles.main} id="conteudo" tabIndex={-1}>
          <header className={styles.topbar}>
            <span className={styles.mobileBrand}>IRON FIT</span>
            <div className={styles.identity}>
              <strong>{user.name}</strong>
              <span>{user.roles.join(" · ") || user.scope}</span>
            </div>
            <button className={styles.button} onClick={() => void logout()}>Sair</button>
          </header>
          <div className={styles.content}>{children}</div>
        </main>
      </div>
    </IronFitSessionProvider>
  );
}
