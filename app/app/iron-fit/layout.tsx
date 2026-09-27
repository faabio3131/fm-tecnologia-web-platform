import type { ReactNode } from "react";
import type { Metadata } from "next";
import { IronFitSessionShell } from "./session-shell";

export const metadata: Metadata = {
  title: "Operação Web | IRON FIT",
  robots: { index: false, follow: false },
};

export default function IronFitOperationalLayout({ children }: { children: ReactNode }) {
  return <IronFitSessionShell>{children}</IronFitSessionShell>;
}
