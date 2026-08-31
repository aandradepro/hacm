# Biblioteca de Componentes de UI — Guia de Seleção para IA

Este documento descreve cada componente disponível de forma que uma IA possa decidir qual usar para cada parte de um texto, com base no tipo de conteúdo, propósito narrativo e estrutura dos dados a apresentar.

---

## Como usar este guia

Para cada bloco de conteúdo do texto, a IA deve responder: **"O que este trecho está fazendo?"** e cruzar com as categorias abaixo. Cada descrição inclui:
- **O que é** — forma visual e comportamento
- **Quando usar** — gatilhos narrativos e estrutura de dados esperada
- **Quando NÃO usar** — casos de confusão frequente com outros componentes
- **Props principais** — o que o componente recebe

---

## INFRAESTRUTURA (Componentes de página — não selecionar por conteúdo)

### `Navigation`
Barra de navegação fixa no topo da página. Rastreia automaticamente qual seção está visível e destaca o item correspondente. Suporta menu mobile (hambúrguer). Lê os links de navegação e o título da seção hero diretamente do objeto `content`.
> **Uso:** Sempre presente, uma vez por página. Não é uma escolha por conteúdo.

### `AnimatedSection`
Wrapper invisível que aplica animação de entrada (fade + slide) quando o elemento entra na viewport. Pode animar de cima, baixo, esquerda, direita ou só com fade. Suporta `delay` em ms para escalonar entradas de elementos irmãos.
> **Uso:** Envolver qualquer bloco de conteúdo que deve aparecer com animação ao scrollar. Não exibe conteúdo próprio — apenas anima o que estiver dentro.

### `ExportButton`
Botão que captura toda a página como imagem e gera um PDF A4 de múltiplas páginas. Mostra progresso percentual durante a geração. Exclui a si mesmo e elementos de navegação do PDF.
> **Uso:** Presente na interface quando o usuário precisa exportar o site como documento. Não relacionado a conteúdo narrativo.

### `LanguageSelector`
Botões de alternância de idioma (ex: EN / PT). Exibe o idioma ativo destacado.
> **Uso:** Infraestrutura de i18n. Não é uma escolha por conteúdo.

### `ResolutionBadge`
Badge informativo (geralmente para demo/portfólio) que exibe a resolução atual da janela e o tipo de dispositivo (Mobile / Tablet / Desktop etc.) com um indicador colorido.
> **Uso:** Evidência técnica de responsividade. Usar em seções que demonstram qualidade técnica do próprio site.

---

## TEXTO E NARRATIVA

### `Quote`
Blockquote centralizado com aspas, fundo suave e tipografia em destaque. Para **uma única frase** de alto impacto.
> **Quando usar:** O texto contém uma afirmação central, posicionamento ou declaração que merece destaque visual isolado — uma "frase de efeito". Ex: a tese principal de uma seção, uma citação de cliente, um insight condensado em uma frase.
> **Quando NÃO usar:** Listas, múltiplos itens, ou frases que são apenas parte de uma sequência.
> **Props:** `text: string`

### `Message`
Pílula/badge centralizado com fundo azul escuro. Para **uma frase curta** que funciona como chamada de ação, status ou conclusão pontual.
> **Quando usar:** Final de seção com um convite ("Vamos conversar?"), confirmação de proposta ou rótulo de encerramento. Mais curto e funcional que `Quote`.
> **Quando NÃO usar:** Frases longas, argumentos ou listas.
> **Props:** `text: string`

### `SAPPerspective`
Box com rótulo "SAP Perspective" e texto centralizado. Aceita uma string ou array de strings separadas por bullet (•). Tem estilo próprio de caixa de destaque editorial.
> **Quando usar:** O texto contém uma **observação técnica de nicho** — uma visão especializada sobre o ecossistema SAP que não se encaixa no fluxo geral mas precisa de destaque. Funciona como "nota do especialista".
> **Quando NÃO usar:** Conteúdo genérico ou aplicável a outras tecnologias.
> **Props:** `text: string | string[]`

---

## LISTAS E PONTOS

### `List`
Lista vertical com bullet configurável (• disc, ◦ dash, ou nenhum). Suporta **subitens** (indentados abaixo de cada item principal). Itens podem ser strings simples ou objetos `{ text, subitems[] }`.
> **Quando usar:** Enumeração de características, responsabilidades, habilidades, benefícios — qualquer lista onde os itens são frases completas ou semi-completas que podem ter detalhamento. Preferir quando há subitens.
> **Quando NÃO usar:** Itens muito curtos (use `Pills` ou `Tags`); quando os itens têm destaque visual especial na primeira letra (use `Points`).
> **Props:** `items: string[] | { text, subitems[] }[]`, `bullet: 'disc' | 'dash' | 'none'`

### `Points`
Lista vertical onde **a primeira letra de cada item é destacada** com tipografia maior e negrito. Sem bullets tradicionais.
> **Quando usar:** Lista de argumentos, diferenciais ou princípios onde cada item começa com uma palavra-chave forte que já serve como ancora visual. Efeito editorial — a primeira letra age como "título embutido".
> **Quando NÃO usar:** Itens que não foram escritos pensando nesse efeito (a primeira letra precisa fazer sentido destacada). Sem subitens.
> **Props:** `items: string[]`

### `CompactPoints`
Variante de `Points` com espaçamento menor (`text-sm`, `space-y-2`). Mesma lógica de destaque da primeira letra, mas mais denso visualmente.
> **Quando usar:** Versão compacta de `Points` para contextos com muitos itens ou espaço limitado.
> **Props:** `items: string[]`

### `Pills`
Tags arredondadas (pill-shaped) dispostas em linha, com fundo azul claro e borda sutil. Layout em `flex-wrap`.
> **Quando usar:** Lista de **termos curtos sem hierarquia** — tecnologias dominadas, palavras-chave de habilidades, atributos de uma pessoa ou produto. Ideal para "o que eu sei fazer" ou "ferramentas usadas".
> **Quando NÃO usar:** Frases completas; itens com descrição associada; quando a relação entre os itens importa (use diagrama ou lista).
> **Props:** `items: string[]`

### `Tags`
Tags com ponto verde (•) antes de cada item. Layout espaçado em linha. Mais discreto visualmente que `Pills`.
> **Quando usar:** Lista de características, valores ou atributos em rodapé de seção, como complemento a outro componente principal. Funciona como "também sou / também faço".
> **Quando NÃO usar:** Quando os itens precisam de destaque — prefira `Pills`. Não use como componente principal de seção.
> **Props:** `items: string[]`

---

## CARDS E PAINÉIS

### `Cards`
Grade de cards (2, 3 ou 4 colunas) com estrutura rich: ícone opcional, **métrica destacada** (número grande), label da métrica, título, descrição e texto de impacto (que pode ser um link). Badge de indústria opcional no canto.
> **Quando usar:** Casos de uso, projetos, resultados — conteúdo que combina **dado quantitativo + contexto qualitativo**. A métrica é o âncora visual; o restante explica o que ela significa.
> **Quando NÃO usar:** Conteúdo sem métricas; conceitos abstratos sem resultado mensurável; listas simples de características (use `Pillars`).
> **Props:** `items: { icon?, metric, metricLabel, title, description, impact, industry?, href? }[]`, `columns: 2|3|4`

### `Pillars`
Grade de cards (2, 3 ou 4 colunas) com estrutura simples: ícone opcional, título e descrição. Sem métricas.
> **Quando usar:** Apresentar **pilares conceituais, áreas de atuação ou competências** — conteúdo onde o nome e a explicação já são suficientes. Ex: "Os três eixos da minha atuação", "Princípios que guiam meu trabalho".
> **Quando NÃO usar:** Quando há dados quantitativos — prefira `Cards`. Quando os itens têm uma progressão narrativa — prefira `Steps` ou `EvidenceCases`.
> **Props:** `items: { icon?, title, description }[]`, `columns: 2|3|4`

### `Steps`
Grade de cards numerados sequencialmente (número em círculo azul + título + descrição). Ordem importa.
> **Quando usar:** **Processos, metodologias, jornadas** onde a sequência é o ponto central. Ex: "Como eu trabalho", "Etapas de uma migração", "Fases do projeto".
> **Quando NÃO usar:** Itens sem ordem natural; competências paralelas (use `Pillars`).
> **Props:** `items: { step: string, description: string }[]`, `columns: 2|3|4`

### `EvidenceCases`
Grade de cards narrativos (Case 1, Case 2…) com estrutura fixa de três blocos: **Problema → Decisão Arquitetural → Resultado de Negócio**. Métrica opcional no cabeçalho.
> **Quando usar:** **Casos reais ou hipotéticos** onde a narrativa problema-solução-impacto é o argumento central. Ideal para portfólio técnico, validação de experiência, demonstração de raciocínio decisório.
> **Quando NÃO usar:** Conteúdo sem progressão narrativa clara; listas de habilidades ou projetos genéricos (use `Cards` ou `Pillars`).
> **Props:** `cases: { title, problem, decision, outcome, metric?, metricLabel? }[]`

### `Tradeoffs`
Grade de pares lado a lado separados por "↔". Cada par mostra dois termos em tensão ou complementaridade.
> **Quando usar:** Quando o texto discute **equilíbrios, compensações ou dualidades** — ex: "Velocidade ↔ Governança", "Custo ↔ Qualidade", "Legado ↔ Modernização". Faz o leitor reconhecer que o autor entende as tensões reais.
> **Quando NÃO usar:** Itens sem relação de tensão entre si; mais de 2 elementos por item.
> **Props:** `items: [string, string][]`

---

## CONTATOS E AÇÕES

### `ContactButtons`
Grupo de botões de contato: email (abre mailto), LinkedIn (abre em nova aba) e calendário opcional (abre em nova aba). Cada botão com cor e estilo próprios.
> **Quando usar:** Seção de encerramento / CTA — quando o texto termina com um convite ao contato. Sempre no final da narrativa.
> **Props:** `contact: { email, linkedin, calendar? }`

---

## DIAGRAMAS SIMPLES

### `Diagram`
Diagrama básico de texto/mono-espaçado dentro de um box. Pode mostrar: um título central destacado, nós como badges/tags em linha, e/ou uma sequência de passos com setas (→).
> **Quando usar:** Representações esquemáticas simples que não justificam um componente especializado — ex: lista de tecnologias relacionadas a um centro, fluxo linear rápido de 3-5 etapas. Componente "coringa" para visualizações leves.
> **Quando NÃO usar:** Quando houver relações visuais complexas, comparações estruturadas ou hierarquias — usar os diagramas especializados abaixo.
> **Props:** `data: { center?, nodes?: string[], steps?: string[] }`

### `FoundationDiagram`
Layout de três colunas (esquerda, centro, direita) com rótulo eyebrow, label principal e, no centro, uma lista opcional de capacidades. Representa uma estrutura em "tríptico" — dois elementos laterais sustentando ou relacionando-se ao central.
> **Quando usar:** Quando o texto apresenta uma **proposta de valor de três vias** — ex: "O que tenho (BW) + O que sou (Arquiteto) + O que entrego (Datasphere)". A marca `~Å~` é renderizada no centro, tornando-o específico ao posicionamento do Alexandre.
> **Quando NÃO usar:** Mais ou menos de três elementos; quando os elementos não têm uma relação centro-lateral.
> **Props:** `data: { left: {label, eyebrow?}, center: {label, eyebrow?, capabilities?[]}, right: {label, eyebrow?} }`

### `RelationshipDiagram`
Diagrama sujeito-verbo-objeto. Dois painéis laterais (cada um com uma "parede de tijolos" de pills/tags) conectados por um verbo central com linha horizontal e uma frase de significado abaixo.
> **Quando usar:** Quando o texto articula uma **relação direta entre duas entidades** — ex: "Minha experiência CONECTA o BW legado ao Datasphere moderno". O verbo é o posicionamento; os painéis são os mundos conectados.
> **Quando NÃO usar:** Mais de duas entidades principais; relações circulares ou múltiplas.
> **Props:** `subject: {label, items[]}`, `verb: string`, `object: {label, items[]}`, `meaning: string`

### `ConvergenceDiagram`
Diagrama SVG responsivo de convergência: múltiplos nós posicionados ao redor com linhas apontando para um **centro único**. Os nós se posicionam automaticamente dependendo da quantidade.
> **Quando usar:** Quando o texto apresenta **múltiplas entradas ou fontes que convergem para um resultado ou papel central** — ex: várias habilidades/experiências que apontam para uma única proposta de valor. Ideal para seções de síntese.
> **Quando NÃO usar:** Quando os elementos são paralelos e independentes (use `Pillars`); quando há uma sequência (use `Steps` ou `VertFlow`).
> **Props:** `center: string`, `nodes: string[]`

### `OrbitDiagram`
Diagrama SVG interativo de órbita elíptica: um **nó central** com múltiplos nós satélite ao redor, conectados por linhas tracejadas. Cada nó satélite tem ícone, título e descrição. Hover destaca o nó. Suporta um badge de "outcome" abaixo, conectado por funil de chevrons.
> **Quando usar:** Quando o texto descreve um **elemento central que orbita ou sustenta múltiplas capacidades/dimensões**, e cada dimensão merece nome, ícone e breve descrição. Mais rico que `ConvergenceDiagram` — usar quando os nós precisam de descrição própria.
> **Quando NÃO usar:** Quando os nós são apenas labels curtos sem descrição (prefira `ConvergenceDiagram`); quando não há um elemento central dominante.
> **Props:** `center: string`, `nodes: { icon, title, description }[]`, `outcome?: string`, `cycleText?: string`

### `BalanceDiagram`
Diagrama SVG de balança: um box central no topo (ponto de equilíbrio + descrição) com braço horizontal conectando dois painéis de pills abaixo (esquerda e direita). Linhas SVG calculadas a partir das posições reais dos elementos.
> **Quando usar:** Quando o texto descreve um **papel mediador ou de equilíbrio entre dois mundos** — ex: "Conheço o BW (legado) E o Datasphere (futuro), e isso me coloca no centro". A visualização de balança comunica ponte/mediação.
> **Quando NÃO usar:** Mais de dois lados; quando não há um ponto central de equilíbrio explícito.
> **Props:** `data: { left: {label, items[]}, right: {label, items[]}, center: string, balancePoint: string }`

---

## FLUXOS E SEQUÊNCIAS

### `VertFlow`
Fluxo em zigue-zague: os passos são distribuídos em pares por linha (esquerdo / direito), com setas horizontais entre eles e setas verticais para baixo ao final de cada linha. Cria um caminho visual que serpenteia.
> **Quando usar:** **Sequências de 4 a 8 etapas** onde o zigue-zague ajuda a mostrar que é uma jornada com múltiplas dimensões — ex: camadas de uma arquitetura, fases de uma metodologia complexa. Mais visual e interessante que uma lista linear.
> **Quando NÃO usar:** Menos de 4 itens (prefira `Steps`); quando a ordem não importa (prefira `Pillars`).
> **Props:** `steps: string[]`, `title?: string`

---

## TABELA DE DECISÃO RÁPIDA

| O texto está fazendo…                                     | Componente recomendado       |
| --------------------------------------------------------- | ---------------------------- |
| Apresentar uma frase de impacto / tese central            | `Quote`                      |
| Convidar ao contato / encerrar com CTA curto              | `Message` + `ContactButtons` |
| Observação técnica SAP de nicho                           | `SAPPerspective`             |
| Listar habilidades curtas / tecnologias                   | `Pills`                      |
| Listar atributos discretos como complemento               | `Tags`                       |
| Listar itens com frases completas (± subitens)            | `List`                       |
| Listar argumentos onde 1ª palavra é âncora                | `Points` / `CompactPoints`   |
| Apresentar pilares conceituais / áreas paralelas          | `Pillars`                    |
| Apresentar resultados com métricas                        | `Cards`                      |
| Apresentar processo / metodologia sequencial              | `Steps`                      |
| Narrar casos reais problema → solução → resultado         | `EvidenceCases`              |
| Mostrar tensões / trade-offs entre pares                  | `Tradeoffs`                  |
| Mostrar múltiplas entradas convergindo para um centro     | `ConvergenceDiagram`         |
| Mostrar um centro com satélites descritos (ícone + texto) | `OrbitDiagram`               |
| Mostrar papel de equilíbrio / ponte entre dois mundos     | `BalanceDiagram`             |
| Mostrar relação sujeito-verbo-objeto entre duas entidades | `RelationshipDiagram`        |
| Apresentar proposta de valor em três vias (tríptico)      | `FoundationDiagram`          |
| Mostrar sequência 4–8 etapas em zigue-zague               | `VertFlow`                   |
| Representação esquemática leve sem componente específico  | `Diagram`                    |
| Animar entrada de qualquer bloco ao scroll                | `AnimatedSection` (wrapper)  |