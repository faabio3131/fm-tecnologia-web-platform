"use client";

import { useCallback, useEffect, useState } from "react";
import { coreGet } from "@/src/lib/iron-fit/core-client";
import { DataTable } from "@/src/components/iron-fit/data-table";
import styles from "@/src/components/iron-fit/core-ui.module.css";

type DashboardState = { summary?: unknown; revenue?: unknown; attendance?: unknown; overdue?: unknown; birthdays?: unknown };

export default function DashboardPage() {
  const [data, setData] = useState<DashboardState>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const [summary, revenue, attendance, overdue, birthdays] = await Promise.all([
        coreGet("dashboard/summary"), coreGet("dashboard/revenue?days=30"), coreGet("dashboard/attendance?days=7"), coreGet("dashboard/overdue"), coreGet("dashboard/birthdays?days=30"),
      ]);
      setData({ summary, revenue, attendance, overdue, birthdays });
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Falha ao carregar dashboard."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  return <section className={styles.page}>
    <header className={styles.header}><div><span className={styles.eyebrow}>IRON FIT / Gestão</span><h1 className={styles.title}>Dashboard</h1><p className={styles.description}>Indicadores vindos diretamente do Core canônico. Nenhum KPI financeiro ou operacional é recalculado no navegador.</p></div><button className={`${styles.button} ${styles.buttonSecondary}`} onClick={() => void load()}>Atualizar</button></header>
    {loading && <div className={styles.loading}>Carregando indicadores…</div>}
    {error && <div className={styles.error}>{error}</div>}
    {!loading && !error && <div className={styles.grid}>
      <div className={styles.card}><h2>Resumo</h2><DataTable data={data.summary} /></div>
      <div className={styles.card}><h2>Receita — 30 dias</h2><DataTable data={data.revenue} /></div>
      <div className={styles.card}><h2>Frequência — 7 dias</h2><DataTable data={data.attendance} /></div>
      <div className={styles.card}><h2>Inadimplência</h2><DataTable data={data.overdue} /></div>
      <div className={styles.card}><h2>Aniversariantes</h2><DataTable data={data.birthdays} /></div>
    </div>}
  </section>;
}
