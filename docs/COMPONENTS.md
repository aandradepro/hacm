# Componentes do Pitch Deck — HACM

Este documento descreve todos os componentes reutilizáveis disponíveis no projeto, com suas funcionalidades, formatos e critérios de uso. Ele foi criado para auxiliar na análise de novos pitch decks e na escolha dos componentes adequados para cada tipo de conteúdo.

---

## Sumário

- AnimatedSection
- ArchitectureBalance
- ArchitectureModel
- Cards
- CompactPoints
- ContactButtons
- ConvergenceDiagram
- Diagram
- EvidenceCases
- ExportButton
- Flow (VertFlow)
- LanguageSelector
- List
- Message
- Navigation
- OrbitDiagram
- Pillars
- Pills
- Points
- Quote
- RelationshipDiagram
- ResolutionBadge
- SAPPerspective
- Steps
- Tags
- Tradeoffs

---

## AnimatedSection

**Propósito:** Envolve conteúdo para animação de entrada (fade-in, slide-up) quando a seção entra no viewport durante o scroll.

**Formato:** Componente wrapper que aceita conteúdo filho e aplica animação com delay configurável.

**Quando usar:** Sempre que um elemento precisa aparecer gradualmente ao rolar a página.

**Props:**
- children: Conteúdo a ser animado
- className: Classes CSS adicionais
- delay: Delay em milissegundos antes da animação (padrão: 0)
- direction: Direção da animação ('up', 'down', 'left', 'right', 'none') (padrão: 'up')
- threshold: Percentual do elemento visível para disparar a animação (padrão: 0.15)

---

## ArchitectureBalance

**Propósito:** Exibe um diagrama de balança entre dois lados (ex: Technology vs Architecture) com um ponto de equilíbrio central.

**Formato:** Duas colunas com tags e um centro com texto de equilíbrio.

**Conteúdo esperado:**
- left: { label: string; items: string[] }
- right: { label: string; items: string[] }
- center: string
- balancePoint: string

**Quando usar:** Para contrastar dois conceitos com um ponto de equilíbrio entre eles.

---

## ArchitectureModel

**Propósito:** Exibe um modelo de arquitetura de três colunas (Existente → Arquitetura → Em Evolução) com capacidades listadas no centro.

**Formato:** Três blocos horizontais (ou verticais em mobile). O bloco central contém uma lista de capacidades e a marca ~Å~.

**Conteúdo esperado:**
- existingLabel: Rótulo do bloco existente
- architectureLabel: Rótulo do bloco de arquitetura
- evolvingLabel: Rótulo do bloco em evolução
- capabilities: Lista de capacidades (opcional)
- existingEyebrow: Título do bloco existente (i18n)
- architectureEyebrow: Título do bloco de arquitetura (i18n)
- evolvingEyebrow: Título do bloco em evolução (i18n)

**Quando usar:** Para representar visualmente um modelo de transição arquitetural.

---

## Cards

**Propósito:** Exibe uma lista de cards com métricas, ícones, títulos, descrições e impactos.

**Formato:** Grid responsivo com cards individuais. Cada card contém: ícone, métrica, rótulo da métrica, título, descrição, impacto.

**Conteúdo esperado:** Array de objetos com icon, metric, metricLabel, title, description, impact, industry (opcional).

**Quando usar:** Para apresentar resultados, evidências ou casos de sucesso com métricas quantificáveis.

**Props:**
- items: Array de objetos com dados dos cards (obrigatório)
- className: Classes CSS adicionais
- columns: Número de colunas em desktop (2, 3 ou 4) (padrão: 3)

---

## CompactPoints

**Propósito:** Exibe uma lista de pontos em formato compacto (texto menor) com capitular na primeira letra.

**Formato:** Lista vertical com texto em tamanho pequeno e primeira letra em destaque.

**Conteúdo esperado:** Array de strings.

**Quando usar:** Para listas de pontos secundários ou complementares.

**Props:**
- items: Array de strings com os pontos (obrigatório)
- className: Classes CSS adicionais

---

## ContactButtons

**Propósito:** Exibe botões de contato (email, LinkedIn, agendamento).

**Formato:** Botões horizontais (ou verticais em mobile) com ícones e textos.

**Conteúdo esperado:** Objeto com email, linkedin, calendar (opcional).

**Quando usar:** Na seção de contato (CTA) para fornecer meios de contato.

**Props:**
- contact: Objeto com dados de contato (obrigatório)
- className: Classes CSS adicionais

---

## ConvergenceDiagram

**Propósito:** Exibe um diagrama orbital onde vários nós convergem para um centro.

**Formato:** SVG com centro e nós distribuídos em órbita, com linhas de conexão.

**Conteúdo esperado:**
- center: string
- nodes: string[]

**Quando usar:** Para mostrar que múltiplos elementos convergem para um ponto central.

**Props:**
- center: Texto central (obrigatório)
- nodes: Array de strings (obrigatório)
- className: Classes CSS adicionais

---

## Diagram

**Propósito:** Exibe um diagrama simples com centro, nós (tags) e/ou fluxo de passos.

**Formato:** Bloco com fundo suave contendo center (texto centralizado com linhas), nodes (tags/badges em linha), steps (fluxo com setas).

**Conteúdo esperado:** Objeto com center (opcional), nodes (opcional), steps (opcional).

**Quando usar:** Para representar visualmente conceitos, relacionamentos ou fluxos de processo de forma simplificada.

---

## EvidenceCases

**Propósito:** Exibe casos de evidência com estrutura Problem → Architectural Decision → Business Outcome.

**Formato:** Cards com três seções (Problem, Decision, Outcome) conectadas por linhas.

**Conteúdo esperado:** Array de objetos com title, problem, decision, outcome, metric (opcional), metricLabel (opcional).

**Quando usar:** Especificamente para a seção Evidence do Coordinating Enterprise Analytics.

**Props:**
- cases: Array de objetos (obrigatório)
- className: Classes CSS adicionais

---

## ExportButton

**Propósito:** Exporta o conteúdo da página como PDF.

**Formato:** Botão fixo no canto inferior direito que, ao ser clicado, gera e baixa um PDF.

**Conteúdo esperado:** Recebe content para referência.

**Quando usar:** Em qualquer página que precise ser exportável como PDF.

**Props:**
- content: Conteúdo do pitch deck (obrigatório)

---

## Flow (VertFlow)

**Propósito:** Exibe um fluxo vertical de passos com caixas e setas.

**Formato:** Caixas em sequência vertical com setas entre elas.

**Conteúdo esperado:**
- title: string (opcional)
- steps: string[]

**Quando usar:** Para mostrar uma sequência de passos ou fluxo de processo.

**Props:**
- steps: Array de strings (obrigatório)
- title: Título opcional
- className: Classes CSS adicionais

---

## LanguageSelector

**Propósito:** Permite alternar entre os idiomas disponíveis.

**Formato:** Botões pequenos (EN/PT) no canto superior direito.

**Conteúdo esperado:** Recebe languages (código e label), currentLang, onLanguageChange.

**Quando usar:** Em páginas com suporte a múltiplos idiomas.

**Props:**
- currentLang: Idioma atualmente selecionado (obrigatório)
- onLanguageChange: Função para mudar o idioma (obrigatório)
- languages: Lista de idiomas disponíveis (obrigatório)

---

## List

**Propósito:** Exibe uma lista de itens com suporte a subitens indentados.

**Formato:** Lista vertical com bullets. Itens podem ter subitens (indentados, com bullet diferente).

**Conteúdo esperado:** Array de objetos com text e subitems (opcional) OU array de strings.

**Quando usar:** Para listas onde itens precisam de subitens aninhados.

**Props:**
- items: Array de objetos ou strings (obrigatório)
- className: Classes CSS adicionais
- bullet: 'disc' | 'dash' | 'none' (padrão: 'disc')

---

## Message

**Propósito:** Exibe uma mensagem de destaque como badge centralizado.

**Formato:** Texto em fundo azul escuro, arredondado, centralizado.

**Conteúdo esperado:** String.

**Quando usar:** Para mensagens de conclusão, resumo ou destaque no final de uma seção.

**Props:**
- text: Texto da mensagem (obrigatório)
- className: Classes CSS adicionais

---

## Navigation

**Propósito:** Navegação fixa com links para as seções da página.

**Formato:** Barra fixa no topo com nome do autor à esquerda, título do pitch centralizado e itens de navegação à direita.

**Conteúdo esperado:** nav.items (label e href), hero.title.

**Quando usar:** Em qualquer página com múltiplas seções.

**Props:**
- content: Conteúdo do pitch deck (obrigatório)
- lang: Idioma atual (obrigatório)

---

## OrbitDiagram

**Propósito:** Diagrama orbital com centro, nós orbitando, ciclo externo e resultado.

**Formato:** SVG com centro em destaque, nós distribuídos em órbita, anel externo com texto de ciclo, e badge de resultado.

**Conteúdo esperado:**
- center: string
- nodes: Array de { icon, title, description }
- outcome: string (opcional)
- cycleText: string (opcional)

**Quando usar:** Na seção Value para mostrar arquitetura no centro coordenando pilares.

**Props:**
- center: Texto central (obrigatório)
- nodes: Array de objetos (obrigatório)
- outcome: Texto de resultado (opcional)
- cycleText: Texto do ciclo externo (opcional)
- className: Classes CSS adicionais

---

## Pillars

**Propósito:** Exibe pilares de valor como cards com ícones, títulos e descrições.

**Formato:** Grid responsivo sem métricas. Cada card contém: ícone, título, descrição.

**Conteúdo esperado:** Array de objetos com icon, title, description.

**Quando usar:** Para apresentar pilares de atuação, áreas de valor ou serviços oferecidos.

**Props:**
- items: Array de pilares (obrigatório)
- className: Classes CSS adicionais
- columns: Número de colunas em desktop (2, 3 ou 4) (padrão: 3)

---

## Pills

**Propósito:** Exibe tags/pills no final de uma seção como palavras-chave ou conceitos.

**Formato:** Tags arredondadas em linha com fundo claro.

**Conteúdo esperado:** Array de strings.

**Quando usar:** Para listar palavras-chave, conceitos ou tópicos relacionados.

**Props:**
- items: Array de strings (obrigatório)
- className: Classes CSS adicionais

---

## Points

**Propósito:** Exibe uma lista de pontos principais com capitular na primeira letra.

**Formato:** Lista vertical com primeira letra em destaque (semibold, ligeiramente maior).

**Conteúdo esperado:** Array de strings.

**Quando usar:** Para listas de argumentos principais ou pontos centrais de uma seção.

**Props:**
- items: Array de strings com os pontos (obrigatório)
- className: Classes CSS adicionais

---

## Quote

**Propósito:** Exibe uma citação/destaque em formato de blockquote.

**Formato:** Texto centralizado com aspas, em fundo cinza claro.

**Conteúdo esperado:** String.

**Quando usar:** Para destacar uma frase, citação ou insight importante.

**Props:**
- text: Texto da citação (obrigatório)
- className: Classes CSS adicionais

---

## RelationshipDiagram

**Propósito:** Exibe um diagrama de relação entre Subject e Object com Verb no centro.

**Formato:** Três colunas: Subject (esquerda) → Verb (centro) → Object (direita), com itens como tags.

**Conteúdo esperado:**
- subject: { label: string; items: string[] }
- verb: string
- object: { label: string; items: string[] }
- meaning: string

**Quando usar:** Para mostrar relação entre dois conceitos (ex: Technology amplifies Architecture).

**Props:**
- subject: Objeto com label e items (obrigatório)
- verb: String (obrigatório)
- object: Objeto com label e items (obrigatório)
- meaning: String (obrigatório)
- className: Classes CSS adicionais

---

## ResolutionBadge

**Propósito:** Exibe a resolução atual da tela como evidência de responsividade.

**Formato:** Badge fixo no canto inferior esquerdo com informações de tamanho e dispositivo.

**Conteúdo esperado:** Nenhum (detecta automaticamente).

**Quando usar:** Em qualquer página para demonstrar responsividade.

**Props:** Nenhuma.

---

## SAPPerspective

**Propósito:** Exibe a perspectiva SAP sobre o conteúdo da seção.

**Formato:** Bloco com fundo claro, borda à esquerda em teal, com label "SAP Perspective".

**Conteúdo esperado:** String ou array de strings (exibido em linha única separado por bullet).

**Quando usar:** Para fornecer contexto SAP específico sobre qualquer tópico.

**Props:**
- text: Texto ou array de textos (obrigatório)
- className: Classes CSS adicionais

---

## Steps

**Propósito:** Exibe uma lista de passos ou etapas em formato de cards numerados.

**Formato:** Grid responsivo com cards. Cada card contém: número, título do passo e descrição.

**Conteúdo esperado:** Array de objetos com step (título) e description.

**Quando usar:** Para apresentar metodologias, processos ou fluxos de trabalho passo a passo.

**Props:**
- items: Array de steps (obrigatório)
- className: Classes CSS adicionais
- columns: Número de colunas em desktop (2, 3 ou 4) (padrão: 4)

---

## Tags

**Propósito:** Exibe tags no Hero com bullets.

**Formato:** Lista em linha com bullets coloridos (teal).

**Conteúdo esperado:** Array de strings.

**Quando usar:** No Hero, para listar características ou atributos principais.

**Props:**
- items: Array de strings (obrigatório)
- className: Classes CSS adicionais

---

## Tradeoffs

**Propósito:** Exibe trade-offs como pares de conceitos opostos.

**Formato:** Grid com cada trade-off em um card, mostrando left ↔ right.

**Conteúdo esperado:** Array de arrays [left, right].

**Quando usar:** Para listar trade-offs arquiteturais (ex: Consistency vs Local Autonomy).

**Props:**
- items: Array de [left, right] (obrigatório)
- className: Classes CSS adicionais

---

## Resumo dos critérios de escolha

| Componente          | Quando escolher                        |
| ------------------- | -------------------------------------- |
| Points              | Lista de argumentos principais         |
| CompactPoints       | Lista de pontos secundários            |
| List                | Lista com subitens aninhados           |
| Cards               | Evidências com métricas                |
| Pillars             | Pilares de valor (sem métricas)        |
| Steps               | Processo/método passo a passo          |
| Diagram             | Representação visual de conceitos      |
| Quote               | Destaque/citação importante            |
| Message             | Mensagem de conclusão                  |
| Pills               | Palavras-chave/tags                    |
| SAPPerspective      | Contexto SAP específico                |
| ArchitectureModel   | Modelo de transição arquitetural       |
| ArchitectureBalance | Contraste entre dois conceitos         |
| RelationshipDiagram | Relação Subject → Verb → Object        |
| OrbitDiagram        | Diagrama orbital com centro e pilares  |
| ConvergenceDiagram  | Convergência de nós para um centro     |
| Tradeoffs           | Pares de conceitos opostos             |
| VertFlow            | Fluxo vertical de passos               |
| EvidenceCases       | Casos com Problem → Decision → Outcome |