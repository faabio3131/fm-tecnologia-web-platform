"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/app/iron-fit")) {
    return <>{children}</>;
  }

  const premiumHome = pathname === "/";

  return (
    <div className="fm-public-site">
      <Header premiumHome={premiumHome} />
      <div id="conteudo" tabIndex={-1}>{children}</div>
      <Footer premiumHome={premiumHome} />
    </div>
  );
}
