import { notFound } from "next/navigation"; import type { Metadata } from "next"; import { products,getProduct } from "@/src/catalog/products"; import { ProductPage } from "@/src/components/marketing/product-page"; import { createMetadata } from "@/src/lib/seo/metadata";
export function generateStaticParams(){return products.map(({slug})=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=getProduct(slug);if(!p)return {};return createMetadata(p.seo.title,p.seo.description,`/produtos/${p.slug}`)}
export default async function ProductRoute({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=getProduct(slug);if(!p)notFound();return <ProductPage product={p}/>}
