# FM Core — Especificação visual para reconstrução 3D fiel

**Objetivo deste documento:** decompor a arte aprovada da V3 (`hero-core.webp`,
raiz do repositório em `src/assets/hero-core.webp`) em subcomponentes visuais
claros, com proporções, materiais e comportamento de luz — para um artista 3D
humano ou uma ferramenta de geração imagem→3D reconstruir com fidelidade.

**Por que este documento existe:** duas tentativas de reconstrução procedural
(scripts Python/bmesh no Blender, sem escultura manual) chegaram perto da
*linguagem* visual mas não da fidelidade exigida. A arte de referência é uma
ilustração gerada por IA de imagem — não segue regras de modelagem física
"normal" (proporções de cérebro estilizadas/impossíveis, espessura e brilho
dos anéis não obedecem a um material real, iluminação pintada, não
simulada). Fechar essa lacuna pede escultura/composição manual com a imagem
ao lado como referência, ou uma ferramenta de geração 3D a partir de imagem
— nenhuma das duas está disponível para mim nesta sessão.

---

## 0. Enquadramento e composição geral

- Câmera: levemente abaixo do centro vertical do conjunto, olhando quase de
  frente com uma leve rotação de 3/4 para a direita (o núcleo mostra duas
  faces do octógono, não uma só).
- O conjunto inteiro é composto por **4 blocos verticais** empilhados,
  do topo para a base:
  1. Cérebro neural (topo)
  2. Núcleo octogonal central (meio, maior elemento, contém o emblema FM)
  3. Anéis orbitais (envolvem o núcleo, cruzam os blocos 1 e 2)
  4. Base/plataforma energética (embaixo, menor, ecoa a forma do núcleo)
- Fundo: preto puro, sem gradiente — todo o brilho vem dos próprios
  elementos (glow/bloom), não de luz ambiente.
- Paleta: azul/ciano elétrico (`#4fb0ff` a `#bfe6ff`) sobre metal
  prata/grafite (`#8a97a6` a `#3c4a5e`) e preto quase puro nas sombras
  (`#02050a`).

---

## 1. Cérebro neural (subcomponente superior)

- **Forma**: silhueta de cérebro reconhecível (dois hemisférios, sulco
  central) mas **construída como malha de fios (wireframe) semitransparente**,
  não como superfície sólida opaca. É mais "holograma de rede neural" do
  que "órgão".
- **Textura de superfície**: rede densa de linhas finas brancas/azul-claras
  conectando pontos, cobrindo toda a superfície do cérebro como uma malha
  geodésica irregular (não um grid regular) — como uma constelação
  desenhada sobre a forma do cérebro.
- **Nós luminosos**: dezenas de pequenos pontos brilhantes (esferas
  pequenas, branco/azul-claro, algumas maiores que outras) distribuídos
  nos vértices da malha de linhas, com um brilho mais intenso no centro
  do cérebro (perto do topo do núcleo) esmaecendo nas bordas.
- **Anéis orbitais ao redor do cérebro**: 2-3 anéis finos, elípticos (não
  circulares — achatados pela perspectiva), com pequenas esferas azuis
  metálicas (contas) distribuídas ao longo deles, cruzando o cérebro em
  ângulos diferentes (como órbitas de elétrons).
- **Cor**: azul-branco brilhante (quase branco no centro/nós, azul mais
  saturado nas linhas), sem partes metálicas opacas nesta camada.
- **Transição para o núcleo**: o cérebro "flui" para dentro do núcleo
  octogonal por um feixe vertical de luz (ver seção 4) — não há uma
  junção mecânica visível entre cérebro e núcleo, é luz contínua.

## 2. Núcleo octogonal central (subcomponente principal)

Este é o elemento mais complexo — várias camadas concêntricas, de fora
para dentro:

1. **Moldura externa metálica**: octógono grosso, material metal escovado
   grafite/prata escuro (`#3c4a5e` a `#0d1620`), com **bisel/chanfro
   visível nas bordas** (a aresta entre a face frontal e a lateral não é
   reta — é uma quina facetada, lê como metal usinado, não plástico).
   Espessura considerável (o núcleo tem profundidade real, não é uma
   placa fina).
2. **Painéis laterais recuados**: nas duas faces laterais visíveis do
   octógono (por causa do ângulo 3/4), há painéis menores, ligeiramente
   recuados em relação à moldura externa, com textura de circuito/placa
   (linhas finas, pequenos retângulos, como uma PCB estilizada) e um
   brilho azul saindo das frestas entre as placas — sugere componentes
   internos visíveis através de vãos, não uma superfície lisa.
3. **Camada intermediária de vidro/energia**: entre a moldura externa e
   a face central, há uma faixa fina translúcida azul brilhante (como
   uma "fresta de energia" contínua ao redor do octógono interno) —
   separa visualmente a moldura metálica da tela central.
4. **Face central (tela/vidro)**: octógono menor, centralizado, material
   vidro escuro translúcido azul profundo (`#08192b` a `#123457`), com
   **textura de partículas/estrelas brilhantes espalhadas dentro do
   vidro** (não é um vidro liso — tem profundidade, como se houvesse algo
   luminoso atrás dele).
5. **Emblema FM**: logo "FM" (símbolo geométrico angular estilizado à
   esquerda do texto "FM", depois "FM Tecnologia" em texto menor abaixo),
   em branco/azul-claro brilhante, centralizado na face de vidro,
   ligeiramente elevado/com glow (não gravado a laser — parece flutuar
   sutilmente à frente do vidro).

## 3. Anéis orbitais (subcomponente ao redor do núcleo)

- **Quantidade**: pelo menos 4-5 anéis distintos, alguns concêntricos,
  outros em ângulos diferentes (não todos coplanares).
- **Formas variadas**:
  - Alguns são **anéis lisos metálicos** (prata/cromado, com reflexo
    especular forte, espessura uniforme).
  - Alguns são **fitas planas curvas** (não seção circular — seção
    retangular achatada, como uma tira de metal dobrada em arco), com
    padrão de textura sutil na superfície (linhas finas, quase digital).
  - Pelo menos um anel tem **glow azul contínuo na borda** (não é
    metal puro — parece ter um "fio de luz" correndo por dentro ou ao
    longo da borda).
- **Comportamento espacial**: os anéis se cruzam entre si e atravessam o
  espaço na frente e atrás do núcleo (alguns passam por trás do octógono,
  outros por cima) — dão sensação real de órbitas 3D, não anéis
  decorativos colados na superfície.
- **Pequenas esferas metálicas**: esferas azul-metálicas pequenas (contas)
  flutuando ao longo de alguns anéis e soltas ao redor do conjunto,
  reforçando a leitura de "sistema orbital"/"átomo".

## 4. Feixe de energia central

- Coluna vertical de luz branca/azul-clara, **muito mais larga e
  brilhante que um simples "raio fino"** — quase um facho cônico, mais
  largo perto do núcleo e afunilando/dissipando perto do cérebro.
- Atravessa o centro do núcleo, saindo pelo topo até o cérebro e
  aparecendo também na base (ver seção 5) — é o elemento que
  visualmente "conecta" as 3 partes (base → núcleo → cérebro) num eixo
  só.

## 5. Base / plataforma energética (subcomponente inferior)

- Estrutura menor, ecoa a forma octogonal do núcleo mas mais achatada
  (como um pedestal/disco), com as mesmas camadas de metal + vidro
  + emblema em miniatura.
- Anéis orbitais também cruzam esta base (extensão do sistema de anéis
  do núcleo, não um elemento isolado).
- Ponto de luz mais intenso do conjunto sai da base, na direção da
  câmera (como se o feixe de energia "pingasse" pra fora por baixo) —
  é o ponto de contraste mais claro/estourado da composição.

## 6. Iluminação e pós-processamento (para replicar em render)

- **Sem luz ambiente difusa visível** — tudo é emissivo/glow, o fundo
  fica preto absoluto nas áreas sem elemento.
- **Bloom forte e generoso**, não sutil — os brilhos "vazam" bastante
  para fora dos contornos dos elementos emissivos (cérebro, frestas de
  energia, feixe central, base). Isso é bem mais intenso do que o bloom
  "comedido" usado nas tentativas anteriores em tempo real.
- **Reflexos especulares fortes e definidos** no metal (pontos de luz
  bem marcados, não difusos) — sugere um estúdio de luz com 2-3 fontes
  pontuais fortes, não uma HDRI ambiente suave.
- **Profundidade de campo leve**: os elementos mais distantes da câmera
  (bordas dos anéis mais externos, partículas de fundo) têm uma leve
  perda de nitidez.
- **Partículas/poeira luminosa** soltas no espaço ao redor de todo o
  conjunto (pontos pequenos, tamanhos variados, mais concentrados perto
  do cérebro e do núcleo, se dissipando nas bordas da composição).

## 7. O que NÃO está presente na V3 (evitar adicionar)

- Sem texto/HUD tipo interface de videogame.
- Sem estrutura mecânica visível tipo "robô"/"máquina" com juntas,
  parafusos, dobradiças.
- Sem cores fora da paleta azul/prata/branco (nada de verde, vermelho,
  roxo).
- Sem geometria perfeitamente lisa/genérica (esfera pura, cilindro puro,
  cubo puro) sem tratamento de superfície — toda superfície visível na
  V3 tem alguma textura/padrão/faceta.

---

## Notas para quem for modelar

- Referência de imagem: `src/assets/hero-core.webp` (arquivo original,
  1536×1536, fundo preto).
- As duas tentativas anteriores de reconstrução procedural estão
  preservadas no histórico do git desta branch, para referência do que
  **não** funcionou bem:
  - `blender/fm-core.glb` + `blender/build_core.py` (V5/V6 — mais simples,
    cérebro-esfera, núcleo-escudo liso).
  - `blender/fm-core-v2.glb` + `blender/build_core_v2.py` (reconstrução
    com hemisférios reais, anéis segmentados, camadas frontais — mais
    próxima, mas ainda distante do nível de detalhe pintado da V3).
- Se a modelagem for feita em Blender, os scripts acima têm exemplos
  funcionais de: recesso frontal real (inset+extrude), anéis segmentados
  via `bmesh.ops.spin`, cérebro com deslocamento orgânico (Musgrave +
  Clouds), texto 3D para o emblema — podem servir de ponto de partida
  técnico, mesmo que o resultado visual precise ser refeito à mão.
