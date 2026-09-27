import type { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
export function createMetadata(title: string, description: string, path: string): Metadata {
 const canonical = new URL(path, siteConfig.url).toString();
 return { title, description, alternates:{canonical}, openGraph:{title,description,url:canonical,siteName:siteConfig.name,type:"website",locale:"pt_BR"} };
}
