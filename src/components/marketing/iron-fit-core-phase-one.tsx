import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/src/catalog/types";
import { siteConfig } from "@/src/config/site";

const domains = ["Aluno", "Treino", "Avaliação", "Equipamentos", "Agenda", "Acesso", "Financeiro", "Inteligência"] as const;

export function IronFitCorePhaseOne({ product }: { product: Product }) {
  const message = "Olá! Quero conhecer o Iron Fit Core e entender a disponibilidade para minha academia.";
  const whatsapp = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;

  return (
    <main className="ironfit-landing ironfit-phase-one">
      <section className="ironfit-hero" aria-labelledby="ironfit-title">
        <div className="ironfit-grid" aria-hidden="true" />
        <div className="container ironfit-hero__inner">
          <Link className="back-link ironfit-back" href="/produtos">← Todos os produtos</Link>
          <div className="ironfit-hero__grid">
            <div className="ironfit-hero__copy">
              <p className="eyebrow">Plataforma vertical para o ecossistema fitness</p>
              <h1 id="ironfit-title">IRON FIT <span>CORE</span></h1>
              <p className="ironfit-tagline">Inteligência no centro. Evolução em movimento.</p>
              <p className="lead">Gestão, alunos, treinos, avaliações, agenda, acesso, equipamentos e financeiro conectados em uma única plataforma.</p>
              <p className="ironfit-support">Enquanto a academia acompanha a operação e o negócio, o aluno leva sua jornada fitness no aplicativo.</p>
              <div className="actions ironfit-actions">
                <a className="button button--primary ironfit-primary" href="#core">Conhecer o Core <span aria-hidden="true">↓</span></a>
                <a className="button button--secondary ironfit-secondary" href={whatsapp}>Falar com a FM <span aria-hidden="true">↗</span></a>
              </div>
              <p className="ironfit-byline">IRON FIT CORE · by FM Tecnologia · ironfitcore.com.br</p>
            </div>
            <div className="ironfit-hero__visual" aria-label="Identidade oficial do Iron Fit Core">
              <span className="ironfit-halo ironfit-halo--one" aria-hidden="true" />
              <span className="ironfit-halo ironfit-halo--two" aria-hidden="true" />
              <Image src="/iron-fit-core-approved-hero.webp" alt="Iron Fit Core — Inteligência no centro. Evolução em movimento." width={840} height={465} priority unoptimized />
            </div>
          </div>
        </div>
      </section>

      <nav className="ironfit-index" aria-label="Nesta página: Iron Fit Core">
        <div className="container"><a href="#core">IRON FIT CORE</a></div>
      </nav>

      <section id="core" className="ironfit-core-section" aria-labelledby="ironfit-core-title">
        <div className="container">
          <div className="ironfit-core-heading">
            <p className="eyebrow">Core Vertical FM Tecnologia</p>
            <h2 id="ironfit-core-title">Um Core. Toda a operação conectada.</h2>
            <p>O Iron Fit Core é o núcleo vertical especializado no ecossistema fitness. Ele organiza o contexto entre gestão, operação e experiência do aluno para que os módulos trabalhem como uma plataforma — não como ilhas.</p>
          </div>

          <div className="ironfit-core-stage">
            <div className="ironfit-core-orbit" aria-hidden="true">
              <span className="orbit orbit--one" />
              <span className="orbit orbit--two" />
              <span className="orbit orbit--three" />
            </div>
            <div className="ironfit-core-mark">
              <Image src="/iron-fit-core-approved-symbol.webp" alt="Símbolo oficial do Iron Fit Core" width={475} height={310} unoptimized />
              <strong>IRON FIT CORE</strong>
              <span>Dados · contexto · inteligência</span>
            </div>
            <div className="ironfit-core-domains">
              {domains.map((domain, index) => (
                <div key={domain} className={`ironfit-domain ironfit-domain--${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span>{domain}</div>
              ))}
            </div>
          </div>

          <div className="ironfit-core-flow" aria-label="Fluxo do Core Vertical">
            <span>Core Vertical</span><i aria-hidden="true">→</i><span>Módulos conectados</span><i aria-hidden="true">→</i><span>Dados contextualizados</span><i aria-hidden="true">→</i><span>Gestão e evolução</span>
          </div>
        </div>
      </section>
    </main>
  );
}
