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
  return <><Header /><div id="conteudo" tabIndex={-1}>{children}</div><Footer /></>;
}
