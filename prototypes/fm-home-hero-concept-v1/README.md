# FM Home Hero — Concept v1 (protótipo isolado)

Protótipo visual standalone do novo Hero da FM Tecnologia. **Não integrado**
ao site oficial Next.js — aplicação independente com o próprio
`package.json`, sem dependências do site real.

## Rodar localmente

```bash
cd prototypes/fm-home-hero-concept-v1
npm install
npm run dev
```

Abre em `http://localhost:5173` (ou a porta indicada pelo Vite).

## Stack

- React 19 + TypeScript + Vite
- CSS puro (sem framework de UI) — variáveis, gradientes, SVG e animações CSS
- Sem WebGL/Three.js: o "Core" é uma composição em SVG + CSS (anéis
  orbitais, malha neural, núcleo hexagonal em vidro/metal) com parallax
  sutil via `pointermove`, mantendo nitidez e leveza em qualquer GPU.

## Estrutura

- `src/components/Hero.tsx` — hero principal (headline, CTAs, diferenciais)
- `src/components/CoreVisual.tsx` — composição visual do FM Core
- `src/components/CoreAssistant.tsx` — demonstração visual estática do
  assistente "Core" (sem LLM, sem API, sem backend)
- `src/components/Products.tsx` — amostra de cards (Kordena, IRON, CampaIA,
  NFCore)
- `src/components/SiteHeader.tsx` — header de referência para dar contexto
  visual ao hero

## Validação

Screenshots em `screenshots/` (gerados via Playwright + Chromium local, script
`screenshot.mjs`) nas resoluções:

- Desktop 1440×900
- Tablet 1024×900
- Mobile 390×844

## Status

Protótipo isolado para avaliação de direção visual. Não representa
implementação em produção, não foi mesclado ao site oficial e não altera
nenhuma rota, componente ou produto real.
