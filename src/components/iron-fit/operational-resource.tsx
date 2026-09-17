"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { coreDelete, coreGet, corePatch, corePost, corePut } from "@/src/lib/iron-fit/core-client";
import { DataTable } from "./data-table";
import styles from "./core-ui.module.css";

export type OperationalField = { name: string; label: string; type?: "text" | "email" | "date" | "datetime-local" | "number" | "select" | "checkbox"; required?: boolean; options?: Array<{ value: string; label: string }> };
export type OperationalCommand = { label: string; method: "POST" | "PATCH" | "PUT" | "DELETE"; path: (values: Record<string, string | boolean>) => string; fields: OperationalField[]; body?: (values: Record<string, string | boolean>) => unknown; rolesNote?: string };

function initial(fields: OperationalField[]) {
  return Object.fromEntries(fields.map((field) => [field.name, field.type === "checkbox" ? false : ""])) as Record<string, string | boolean>;
}

function payload(values: Record<string, string | boolean>) {
  return Object.fromEntries(Object.entries(values).filter(([, value]) => value !== ""));
}

function OperationForm({ operation, onDone }: { operation: OperationalCommand; onDone: () => Promise<void> }) {
  const [values, setValues] = useState(() => initial(operation.fields));
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const path = operation.path(values);
      const body = operation.body ? operation.body(values) : payload(values);
      if (operation.method === "POST") await corePost(path, body);
      else if (operation.method === "PATCH") await corePatch(path, body);
      else if (operation.method === "PUT") await corePut(path, body);
      else await coreDelete(path);
      setValues(initial(operation.fields));
      setMessage("Operação concluída pelo Core.");
      await onDone();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Falha na operação.");
    } finally {
      setBusy(false);
    }
  }

  return <form className={styles.form} onSubmit={submit}>
    <h2>{operation.label}</h2>
    {operation.rolesNote && <p className={styles.muted}>{operation.rolesNote}</p>}
    <div className={styles.formGrid}>{operation.fields.map((field) => <label className={styles.field} key={field.name}><span>{field.label}</span>{field.type === "select" ? <select required={field.required} value={String(values[field.name] ?? "")} onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}><option value="">Selecione</option>{field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : field.type === "checkbox" ? <input type="checkbox" checked={Boolean(values[field.name])} onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.checked }))} /> : <input type={field.type ?? "text"} required={field.required} value={String(values[field.name] ?? "")} onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))} />}</label>)}</div>
    <div className={styles.actions}><button className={styles.button} disabled={busy} type="submit">{busy ? "Processando…" : operation.label}</button></div>
    {message && <p className={styles.muted} role="status">{message}</p>}
  </form>;
}

export function OperationalResource({ title, description, listPath, preferred = [], empty, operations = [], notice }: { title: string; description: string; listPath: string; preferred?: string[]; empty?: string; operations?: OperationalCommand[]; notice?: string }) {
  const [data, setData] = useState<unknown>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setState("loading");
    try {
      setData(await coreGet(listPath));
      setState("ready");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Falha ao carregar dados.");
      setState("error");
    }
  }, [listPath]);

  useEffect(() => { void load(); }, [load]);

  return <section className={styles.page}>
    <header className={styles.header}><div><span className={styles.eyebrow}>IRON FIT / Core Web</span><h1 className={styles.title}>{title}</h1><p className={styles.description}>{description}</p></div><button className={`${styles.button} ${styles.buttonSecondary}`} type="button" onClick={() => void load()}>Atualizar</button></header>
    {notice && <div className={styles.notice}>{notice}</div>}
    {state === "loading" && <div className={styles.loading}>Carregando dados canônicos…</div>}
    {state === "error" && <div className={styles.error}>{error}</div>}
    {state === "ready" && <DataTable data={data} preferred={preferred} empty={empty} />}
    {operations.length > 0 && <div className={styles.grid}>{operations.map((operation) => <div className={styles.card} key={operation.label}><OperationForm operation={operation} onDone={load} /></div>)}</div>}
  </section>;
}
