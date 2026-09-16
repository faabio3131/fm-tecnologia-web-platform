import { formatBRL } from "@/src/catalog/commerce";
import { getProduct } from "@/src/catalog/products";
import { siteConfig } from "@/src/config/site";

const tourViews = [
  { title: "Dashboard da academia", text: "Alunos, operação, frequência, cobranças, receita e indicadores em uma visão gerencial." },
  { title: "Gestão de alunos", text: "Cadastro, status, contexto, histórico e vínculo com academia ou unidade." },
  { title: "Treinos e avaliações", text: "Avaliação, prescrição, sessões, exercícios, acompanhamento e aprovação profissional." },
  { title: "Equipamentos", text: "Catálogo mestre, inventário da unidade e relação entre equipamentos e exercícios." },
  { title: "Financeiro", text: "Cobranças, recebimentos, pendências, mensalidades e visão de receita." },
  { title: "App do aluno", text: "Treino, agenda, check-in, evolução, financeiro e perfil conectados à academia." },
] as const;

const faqs = [
  ["O Iron Fit Core é apenas um aplicativo para alunos?", "Não. O Iron Fit Core conecta gestão, operação e experiência do aluno em uma plataforma vertical para academias."],
  ["A academia consegue gerenciar treinos e avaliações?", "Sim. Os fluxos contemplam avaliações, prescrições, sessões, exercícios, acompanhamento e aprovação profissional."],
  ["O aluno possui aplicativo próprio?", "Sim. A experiência do aluno reúne treinos, agenda, check-in, avaliações e evolução, financeiro e perfil."],
  ["O sistema possui gestão financeira?", "Sim. A plataforma contempla mensalidades, cobranças, recebimentos, pendências e visão de receita conectadas à operação."],
  ["O Iron Fit utiliza inteligência artificial?", "A arquitetura Iron Intelligence foi preparada para recursos inteligentes governados, sem substituir o controle profissional e sem transformar IA em dependência dos fluxos essenciais."],
  ["O sistema suporta múltiplas academias ou unidades?", "A arquitetura suporta academias e unidades com contexto e isolamento próprios, preservando permissões e separação operacional."],
  ["O Iron Fit já está integrado ao Wellhub, TotalPass e ClassPass?", "A arquitetura está preparada e existem trabalhos internos de integração, mas a disponibilidade externa depende de integração, credenciais e homologação de cada provider."],
  ["Como funciona a segurança dos dados?", "A arquitetura considera autenticação, papéis e permissões, isolamento entre academias, auditoria, rastreabilidade e consentimentos, sem apresentar certificações externas não comprovadas."],
] as const;

export function IronFitConversionFinal() {
  const product = getProduct("iron-fit");
  const pricing = product?.pricing;
  const message = "Olá! Quero conhecer as condições comerciais do Iron Fit Core para minha academia.";
  const whatsapp = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;

  return <>
    <section id="demo" className="ironfit-conversion-section ironfit-demo" aria-labelledby="ironfit-demo-title">
      <div className="container ironfit-conversion-split">
        <div className="ironfit-conversion-copy">
          <p className="eyebrow">Demonstração do produto</p>
          <h2 id="ironfit-demo-title">Veja o Iron Fit Core funcionando como uma única plataforma.</h2>
          <p>Uma visão prática de como gestão, operação e experiência do aluno se conectam no dia a dia.</p>
          <span className="ironfit-state-pill">Demonstração em preparação</span>
        </div>
        <div className="ironfit-demo-frame" aria-label="Espaço reservado para a demonstração oficial do Iron Fit Core">
          <div className="ironfit-demo-frame__top"><span /><span /><span /><b>IRON FIT CORE</b></div>
          <div className="ironfit-demo-frame__body"><div className="ironfit-demo-play" aria-hidden="true">▶</div><strong>Demonstração oficial</strong><small>O vídeo real será inserido aqui quando estiver aprovado.</small></div>
        </div>
      </div>
    </section>

    <section id="tour" className="ironfit-conversion-section ironfit-tour" aria-labelledby="ironfit-tour-title">
      <div className="container">
        <div className="ironfit-conversion-heading"><p className="eyebrow">Tour do produto</p><h2 id="ironfit-tour-title">Conheça os ambientes que conectam a operação da academia.</h2><p>As capturas reais do produto serão apresentadas aqui conforme forem aprovadas.</p></div>
        <div className="ironfit-tour-grid">
          {tourViews.map((view, index) => <article key={view.title} className="ironfit-tour-card">
            <div className="ironfit-tour-shot" aria-label={`Espaço reservado para screenshot de ${view.title}`}><div><span>0{index + 1}</span><b>IRON FIT CORE</b></div><strong>Screenshot real em preparação</strong></div>
            <div className="ironfit-tour-card__copy"><span>0{index + 1}</span><h3>{view.title}</h3><p>{view.text}</p></div>
          </article>)}
        </div>
      </div>
    </section>

    <section id="planos" className="ironfit-conversion-section ironfit-pricing" aria-labelledby="ironfit-pricing-title">
      <div className="container ironfit-pricing-layout">
        <div className="ironfit-conversion-copy"><p className="eyebrow">Planos</p><h2 id="ironfit-pricing-title">Planos para acompanhar o crescimento da academia.</h2><p>Condições mensais, anuais e Enterprise para diferentes necessidades comerciais, com a mesma visão integrada do Iron Fit Core.</p><p className="ironfit-pricing-status"><strong>Liberação comercial em preparação.</strong> Teste ainda não disponível para ativação.</p></div>
        <div className="ironfit-pricing-panel">
          {pricing ? <>
            <div><span>Mensal</span><strong>{formatBRL(pricing.monthly)}<small>/mês</small></strong></div>
            <div><span>Anual</span><strong>{formatBRL(pricing.annual)}<small>/ano</small></strong></div>
            {pricing.enterprise && <div><span>Enterprise</span><strong>Sob consulta</strong></div>}
          </> : <p>Condições comerciais em preparação.</p>}
          <div className="ironfit-pricing-actions"><a className="button button--primary ironfit-primary" href={whatsapp}>Falar com a FM <span aria-hidden="true">↗</span></a><a className="button button--secondary ironfit-secondary" href="#contato">Conhecer condições</a></div>
        </div>
      </div>
    </section>

    <section id="duvidas" className="ironfit-conversion-section ironfit-faq" aria-labelledby="ironfit-faq-title">
      <div className="container">
        <div className="ironfit-conversion-heading"><p className="eyebrow">Dúvidas frequentes</p><h2 id="ironfit-faq-title">Respostas rápidas sobre o Iron Fit Core.</h2></div>
        <div className="ironfit-faq-grid">{faqs.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}</div>
      </div>
    </section>

    <section id="contato" className="ironfit-final-cta" aria-labelledby="ironfit-final-title">
      <div className="container ironfit-final-cta__inner">
        <p className="eyebrow">IRON FIT CORE</p><h2 id="ironfit-final-title">Conecte gestão, operação e experiência do aluno.</h2><p>Unifique a operação da academia e a jornada do aluno em uma plataforma construída para evoluir com o negócio.</p>
        <div className="actions"><a className="button button--primary ironfit-primary" href={whatsapp}>Falar com a FM <span aria-hidden="true">↗</span></a><a className="button button--secondary ironfit-secondary" href="#planos">Ver planos</a></div>
        <small>ironfitcore.com.br · by FM Tecnologia</small>
      </div>
    </section>
  </>;
}
