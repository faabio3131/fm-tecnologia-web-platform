# Página do AtendeVendeIA

- Ocupa o espaço do antigo "Vendedor IA" (id `prod_vendedor_ia`), agora em `/produtos/atendevendeia`.
- As rotas antigas `/produtos/vendedor-ia` e `/teste-gratis/vendedor-ia` redirecionam (308) para as novas (`next.config.ts`).
- Conteúdo em `src/catalog/product-landings.json` (chave `atendevendeia`); dados em `src/catalog/products.ts`.
- Estado comercial: "Em desenvolvimento · Em breve". Sem preço, sem teste grátis e sem promessa de disponibilidade até a produção estar no ar.
- Para liberar depois: ajustar `lifecycle`, `commercialAvailability`, preços e teste no catálogo, e definir `NEXT_PUBLIC_ATENDEVENDEIA_TRIAL_URL` se houver teste.
- Símbolo: `public/brand/atendevendeia-mark.svg`.
