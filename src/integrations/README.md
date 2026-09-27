# Integrações

Limite arquitetural para gateways futuros. Integrações de IA devem permanecer multi-provider, multi-model e provider-agnostic; nenhum SDK ou segredo pertence ao cliente web.

## NFCore commercial offer

O site FM não é autoridade de preço, release comercial, checkout ou produção fiscal do NFCore.

Contrato canônico consumido:

`GET {NFCORE_API_URL}/v1/commercial/offer`

`NFCORE_API_URL` é configuração **server-side** do runtime do site. Não usar prefixo `NEXT_PUBLIC_` e não copiar a URL upstream para componentes do navegador.

Fluxo:

`Browser -> /api/nfcore/commercial-offer -> NFCORE_API_URL/v1/commercial/offer`

Regras:

- o BFF valida a resposta antes de projetá-la;
- ausência da variável, timeout, HTTP não-2xx ou payload inválido resultam em fallback fail-closed;
- fallback: release `unavailable`, pricing `unpriced`, checkout `unconfigured`, `purchase_enabled=false` e `trial_enabled=false`;
- pricing publicado não habilita compra;
- `commercial_approved` não habilita compra enquanto não existir um contrato explícito de checkout;
- autoridade fiscal de produção nunca é derivada pelo site;
- nenhum preço NFCore é hardcoded no repositório do site;
- nenhuma credencial Cakto, fiscal ou de infraestrutura pertence a esta integração.

A URL real do NFCore só deve ser configurada quando houver ambiente externo autorizado. Até lá, o site permanece operacional e fail-closed sem inventar disponibilidade.
