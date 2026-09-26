import Image from "next/image";
import { ButtonLink } from "@/src/components/ui/button-link";

const proofPoints = [
  "IA + automação",
  "Produtos verticais",
  "Arquitetura preparada para crescer",
] as const;

const capabilityPlates = [
  ["Atendimento", "top"],
  ["Vendas", "upper-right"],
  ["Estoque", "lower-right"],
  ["Produção", "bottom"],
  ["Financeiro", "lower-left"],
  ["Clientes", "upper-left"],
] as const;

export function FmPremiumHero() {
  return (
    <section className="fm-premium-hero fm-premium-hero--approved" aria-labelledby="fm-premium-hero-title">
      <div className="fm-premium-hero__atmosphere" aria-hidden="true" />

      <div className="container fm-premium-container fm-premium-hero__layout">
        <div className="fm-premium-hero__copy">
          <p className="fm-premium-hero__kicker">FM Tecnologia · IA · automação · software</p>

          <h1 id="fm-premium-hero-title">
            Tecnologia que conecta
            <span>operação, dados e inteligência.</span>
          </h1>

          <p className="fm-premium-hero__lead">
            Desenvolvemos produtos inteligentes para transformar processos, acelerar decisões
            e preparar operações para crescer.
          </p>

          <div className="actions">
            <ButtonLink href="/produtos" className="fm-hero-primary">Conhecer produtos</ButtonLink>
            <ButtonLink href="/contato" variant="secondary" className="fm-hero-secondary">Falar com a FM</ButtonLink>
          </div>

          <div className="fm-premium-hero__proof" aria-label="Diferenciais da FM Tecnologia">
            {proofPoints.map((point) => <span key={point}>{point}</span>)}
          </div>
        </div>

        <aside className="fm-core-approved" aria-label="Core, gerente de IA da FM Tecnologia">
          <div className="fm-core-approved__glow" aria-hidden="true" />

          <div className="fm-core-approved__visual">
            <Image
              src="/brand/fm-core-approved.webp"
              alt="Core, gerente de IA da FM Tecnologia, conectando atendimento, vendas, estoque, produção, financeiro e clientes"
              width={1536}
              height={1536}
              priority
              unoptimized
              sizes="(max-width: 680px) 96vw, (max-width: 1024px) 72vw, 48vw"
              className="fm-core-approved__image"
            />

            <div className="fm-core-approved__plates" aria-hidden="true">
              {capabilityPlates.map(([label, position]) => (
                <span key={label} className={"fm-core-approved__plate fm-core-approved__plate--" + position}>
                  <i />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <p className="fm-core-approved__caption">
            <strong>CORE</strong>
            <span>Gerente de IA da FM Tecnologia</span>
          </p>
        </aside>
      </div>
    </section>
  );
}
