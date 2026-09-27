import type { ReactNode } from "react"; import { Badge } from "@/src/components/ui/badge";
export function ContentPage({eyebrow,title,intro,children}:{eyebrow:string;title:string;intro:string;children:ReactNode}){return <main><section className="page-hero"><div className="container narrow"><Badge>{eyebrow}</Badge><h1>{title}</h1><p className="lead">{intro}</p></div></section>{children}</main>}
