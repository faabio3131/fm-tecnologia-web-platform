import type { MetadataRoute } from "next"; import { products } from "@/src/catalog/products"; import { siteConfig } from "@/src/config/site";
export const dynamic = "force-static";
export default function sitemap():MetadataRoute.Sitemap{const paths=["","/produtos","/solucoes","/precos","/recursos","/empresa","/contato","/entrar",...products.map(p=>`/produtos/${p.slug}`)];return paths.map(path=>({url:`${siteConfig.url}${path}`,changeFrequency:path===""?"weekly":"monthly",priority:path===""?1:path==="/produtos"?.9:.7}))}
