import Link from "next/link";
import { siteConfig } from "@/src/config/site";
import { approvedCtaLabels } from "@/src/catalog/commerce";
import { Logo } from "./logo";
import { ButtonLink } from "@/src/components/ui/button-link";

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {siteConfig.navigation.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/entrar">Entrar</Link>
          <ButtonLink href="/precos">{approvedCtaLabels.plans}</ButtonLink>
        </div>
        <details className="mobile-menu">
          <summary aria-label="Abrir menu"><span /><span /></summary>
          <nav aria-label="Navegação móvel">
            {siteConfig.navigation.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
            <Link href="/entrar">Entrar</Link>
            <ButtonLink href="/precos">{approvedCtaLabels.plans}</ButtonLink>
            <ButtonLink href="/contato" variant="secondary">{approvedCtaLabels.specialist}</ButtonLink>
          </nav>
        </details>
      </div>
    </header>
  );
}
