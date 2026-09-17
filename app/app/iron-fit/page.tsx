import styles from "./iron-fit-shell.module.css";

export default function IronFitOperationalHome() {
  return (
    <section aria-labelledby="iron-fit-foundation-title">
      <span className={styles.eyebrow}>Fundação operacional</span>
      <h1 className={styles.title} id="iron-fit-foundation-title">IRON FIT Web</h1>
      <p className={styles.lead}>Sessão, autenticação, tenant e shell Web estão conectados ao Core canônico. Os módulos operacionais serão liberados somente após a certificação desta fundação.</p>
      <p><span className={styles.status}><span className={styles.dot} />M2 em certificação</span></p>
      <div className={styles.grid}>
        <article className={styles.card}><h2 className={styles.sectionTitle}>Sessão governada</h2><p className={styles.sectionText}>Access e refresh tokens permanecem server-side em cookies HttpOnly.</p></article>
        <article className={styles.card}><h2 className={styles.sectionTitle}>Tenant seguro</h2><p className={styles.sectionText}>A academia ativa é validada pelo backend e nunca determinada pelo frontend.</p></article>
        <article className={styles.card}><h2 className={styles.sectionTitle}>Core soberano</h2><p className={styles.sectionText}>RBAC e regras de negócio continuam no backend. A Web não cria um segundo motor.</p></article>
      </div>
    </section>
  );
}
