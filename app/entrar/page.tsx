import { Suspense } from "react";
import { createMetadata } from "@/src/lib/seo/metadata";
import { IronFitLoginForm } from "./login-form";

export const metadata = createMetadata("Entrar", "Acesso seguro ao ecossistema FM Tecnologia.", "/entrar");

export default function Page() {
  return (
    <main className="account-page">
      <section className="account-panel">
        <span className="eyebrow">Conta FM · IRON FIT</span>
        <h1>Acesso seguro ao IRON FIT.</h1>
        <p>Use sua conta autorizada. Quando houver mais de uma academia disponível, a seleção será validada pelo backend antes da criação da sessão.</p>
        <div className="account-note">
          <b>Sessão protegida</b>
          <span>As credenciais de sessão permanecem em cookies HttpOnly e não ficam disponíveis para JavaScript do navegador.</span>
        </div>
        <Suspense fallback={<p>Carregando acesso…</p>}>
          <IronFitLoginForm />
        </Suspense>
      </section>
      <aside>
        <span>IRON FIT / CORE</span>
        <h2>Gestão conectada.<br />Autoridade no Core.</h2>
      </aside>
    </main>
  );
}
