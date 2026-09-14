import { ContentPage } from "@/src/components/marketing/content-page";
import { createMetadata } from "@/src/lib/seo/metadata";
import { siteConfig } from "@/src/config/site";

export const metadata = createMetadata("Contato", "Fale com a FM Tecnologia por e-mail.", "/contato");

export default function Page() {
  return (
    <ContentPage eyebrow="Contato" title="Vamos conversar." intro="Entre em contato por e-mail para conversar sobre os produtos da FM Tecnologia.">
      <section className="section">
        <div className="container form-shell">
          <article className="product-card">
            <h2>Contato comercial</h2>
            <p><a style={{overflowWrap:"anywhere"}} href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></p>
            <div className="actions">
              <a className="button button--primary" href={`mailto:${siteConfig.contactEmail}`} aria-describedby="email-note">Escrever e-mail <span aria-hidden="true">→</span></a>
            </div>
            <p id="email-note" className="muted" style={{marginTop:"1rem",marginBottom:0}}>O botão abre seu aplicativo de e-mail. Se preferir, copie o endereço e envie pelo Gmail. A mensagem será enviada somente quando você confirmar o envio no seu aplicativo.</p>
          </article>
        </div>
      </section>
    </ContentPage>
  );
}
