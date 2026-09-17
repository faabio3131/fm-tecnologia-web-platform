"use client";

import { FormEvent, useState } from "react";
import { coreGet, corePost } from "@/src/lib/iron-fit/core-client";
import { DataTable } from "@/src/components/iron-fit/data-table";
import styles from "@/src/components/iron-fit/core-ui.module.css";

export default function AssessmentsPage() {
  const [studentId, setStudentId] = useState("");
  const [data, setData] = useState<unknown>([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ weight: "", height: "", bodyFatPercent: "", notes: "" });

  async function load() {
    if (!studentId) return;
    try { setData(await coreGet(`students/${studentId}/assessments`)); setMessage(""); }
    catch (error) { setMessage(error instanceof Error ? error.message : "Falha ao carregar avaliações."); }
  }

  async function create(event: FormEvent) {
    event.preventDefault();
    try {
      const body = {
        ...(form.weight ? { weight: Number(form.weight) } : {}),
        ...(form.height ? { height: Number(form.height) } : {}),
        ...(form.bodyFatPercent ? { bodyFatPercent: Number(form.bodyFatPercent) } : {}),
        ...(form.notes ? { notes: form.notes } : {}),
      };
      await corePost(`students/${studentId}/assessments`, body);
      setForm({ weight: "", height: "", bodyFatPercent: "", notes: "" });
      setMessage("Avaliação registrada pelo Core.");
      await load();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Falha ao registrar avaliação."); }
  }

  return <section className={styles.page}>
    <header><span className={styles.eyebrow}>IRON FIT / Avaliações</span><h1 className={styles.title}>Avaliações físicas</h1><p className={styles.description}>Histórico e criação vinculados ao aluno e ao tenant autenticado, seguindo o contrato canônico do backend.</p></header>
    <div className={styles.card}><label className={styles.field}><span>ID do aluno</span><input value={studentId} onChange={(event) => setStudentId(event.target.value)} /></label><div className={styles.actions}><button className={styles.button} type="button" onClick={() => void load()}>Carregar histórico</button></div></div>
    <DataTable data={data} preferred={["id", "createdAt", "weight", "height", "bmi", "bodyFatPercent", "notes"]} empty="Informe um aluno para consultar o histórico." />
    <div className={styles.card}><form className={styles.form} onSubmit={create}><h2>Nova avaliação</h2><div className={styles.formGrid}>
      <label className={styles.field}><span>Peso</span><input type="number" step="0.01" value={form.weight} onChange={(event) => setForm({ ...form, weight: event.target.value })} /></label>
      <label className={styles.field}><span>Altura</span><input type="number" step="0.01" value={form.height} onChange={(event) => setForm({ ...form, height: event.target.value })} /></label>
      <label className={styles.field}><span>Gordura corporal (%)</span><input type="number" step="0.01" value={form.bodyFatPercent} onChange={(event) => setForm({ ...form, bodyFatPercent: event.target.value })} /></label>
      <label className={styles.field}><span>Observações</span><input value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} /></label>
    </div><button className={styles.button} disabled={!studentId} type="submit">Registrar avaliação</button></form></div>
    {message && <p className={styles.muted} role="status">{message}</p>}
  </section>;
}
