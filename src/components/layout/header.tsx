import Link from "next/link";
import { siteConfig } from "@/src/config/site";
import { approvedCtaLabels } from "@/src/catalog/commerce";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { ButtonLink } from "@/src/components/ui/button-link";

export function Header({ premiumHome = false }: { premiumHome?: boolean }) {
  return (
    <header className={`site-header${premiumHome ? " site-header--premium-home" : ""}`}>
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {siteConfig.navigation.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/entrar">Entrar</Link>
          <ButtonLink href="/precos">{premiumHome ? "Comece grátis" : approvedCtaLabels.plans}</ButtonLink>
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}
