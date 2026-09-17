"use client";

import { FormEvent, useState } from "react";
import { corePost } from "@/src/lib/iron-fit/core-client";
import { useIronFitSession } from "@/src/lib/iron-fit/session-context";
import { DataTable } from "@/src/components/iron-fit/data-table";
import styles from "@/src/components/iron-fit/core-ui.module.css";

function CandidatePanel() {
  const [studentId, setStudentId] = useState("");
  const [assessmentId, setAssessmentId] = useState("");
  const [instructions, setInstructions] = useState("");
  const [result, setResult] = useState<unknown>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const candidate = await corePost("ai/workout-candidates", {
        studentId,
        ...(assessmentId ? { assessmentId } : {}),
        ...(instructions ? { instructions } : {}),
      });
      setResult(candidate);
      setMessage("Candidato criado para revisão humana. Nenhuma ativação automática foi executada.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Falha ao gerar candidato.");
    } finally {
      setBusy(false);
    }
  }

  return <div className={styles.card}>
    <form className={styles.form} onSubmit={submit}>
      <h2>Candidato de treino por IA</h2>
      <p className={styles.muted}>A IA somente propõe. Aprovação e ativação continuam no workflow humano do módulo Treinos.</p>
      <div className={styles.formGrid}>
        <label className={styles.field}><span>ID do aluno</span><input required value={studentId} onChange={(event) => setStudentId(event.target.value)} /></label>
        <label className={styles.field}><span>ID da avaliação (opcional)</span><input value={assessmentId} onChange={(event) => setAssessmentId(event.target.value)} /></label>
        <label className={styles.field}><span>Instruções (opcional)</span><input maxLength={1000} value={instructions} onChange={(event) => setInstructions(event.target.value)} /></label>
      </div>
      <div className={styles.actions}><button className={styles.button} disabled={busy}>{busy ? "Gerando…" : "Gerar candidato"}</button></div>
      {message && <p className={styles.muted} role="status">{message}</p>}
    </form>
    {result !== null && <DataTable data={result} preferred={["id", "status", "createdByAI", "approvedById", "studentId"]} />}
  </div>;
}

function StudentAiPanel() {
  const [messageText, setMessageText] = useState("");
  const [result, setResult] = useState<unknown>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function chat(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      setResult(await corePost("me/ai/chat", { message: messageText }));
      setStatus("Resposta processada pela camada AI governada.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "IA indisponível.");
    } finally {
      setBusy(false);
    }
  }

  async function insights() {
    setBusy(true);
    setStatus("");
    try {
      setResult(await corePost("me/ai/workout-insights", { kind: "workout_insights" }));
      setStatus("Insights calculados a partir do contexto reconstruído no servidor.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "IA indisponível.");
    } finally {
      setBusy(false);
    }
  }

  return <div className={styles.card}>
    <form className={styles.form} onSubmit={chat}>
      <h2>IRON Intelligence</h2>
      <p className={styles.muted}>O contexto real é reconstruído pelo backend; dados enviados pelo navegador nunca são autoridade.</p>
      <label className={styles.field}><span>Mensagem</span><input required maxLength={2000} value={messageText} onChange={(event) => setMessageText(event.target.value)} /></label>
      <div className={styles.actions}>
        <button className={styles.button} disabled={busy}>{busy ? "Processando…" : "Enviar"}</button>
        <button className={`${styles.button} ${styles.buttonSecondary}`} disabled={busy} type="button" onClick={() => void insights()}>Insights de treino</button>
      </div>
      {status && <p className={styles.muted} role="status">{status}</p>}
    </form>
    {result !== null && <DataTable data={result} />}
  </div>;
}

export default function InteligenciaPage() {
  const user = useIronFitSession();
  const student = user.roles.includes("STUDENT") && !user.isSuperAdmin;

  return <section className={styles.page}>
    <header className={styles.header}><div><span className={styles.eyebrow}>IRON FIT / AI0 G1–G7</span><h1 className={styles.title}>IRON Intelligence</h1><p className={styles.description}>Superfície Web da IA certificada, com entitlement, sanitização, provenance, provider abstraction e human-in-the-loop preservados no backend.</p></div></header>
    <div className={styles.notice}>Provider externo não configurado ou indisponível deve falhar fechado; o Web não cria fallback fictício nem expõe segredos.</div>
    <div className={styles.grid}>{student ? <StudentAiPanel /> : <CandidatePanel />}</div>
  </section>;
}
