import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./kordena.css";
import "./kordena-audit.css";
import "./kordena-cube-refine.css";
import "./kordena-approved-asset.css";
import "./kordena-tour.css";
import "./kordena-integrations.css";
import "./kordena-next-blocks.css";
import "./kordena-final-audit.css";
import "./ironfit-core.css";
import "./ironfit-core-expanded.css";
import "./ironfit-hero-identity-fix.css";
import "./ironfit-intelligence-ecosystem-security.css";
import "./ironfit-conversion-final.css";
import "./ironfit-final-audit.css";
import "./fm-brand.css";
import "./fm-premium-foundation.css";
import "./fm-premium-hero.css";
import "./fm-premium-approved.css";
import { SiteChrome } from "@/src/components/layout/site-chrome";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "FM Tecnologia — IA para melhorar hoje e evoluir o amanhã", template: "%s | FM Tecnologia" },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "pt_BR", siteName: siteConfig.name, title: siteConfig.name, description: siteConfig.description, url: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
