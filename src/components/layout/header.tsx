import Link from "next/link";
import { siteConfig } from "@/src/config/site";
import { Logo } from "./logo";
import { ButtonLink } from "@/src/components/ui/button-link";
export function Header(){return <header className="site-header"><div className="container header-inner"><Logo/><nav className="desktop-nav" aria-label="Navegação principal">{siteConfig.navigation.map(i=><Link key={i.href} href={i.href}>{i.label}</Link>)}</nav><div className="header-actions"><Link href="/entrar">Entrar</Link><ButtonLink href="/precos">Começar teste grátis</ButtonLink></div><details className="mobile-menu"><summary aria-label="Abrir menu"><span/><span/></summary><nav aria-label="Navegação móvel">{siteConfig.navigation.map(i=><Link key={i.href} href={i.href}>{i.label}</Link>)}<Link href="/entrar">Entrar</Link><ButtonLink href="/precos">Começar teste grátis</ButtonLink><ButtonLink href="/contato" variant="secondary">Falar com um especialista</ButtonLink></nav></details></div></header>}
