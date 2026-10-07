# Mapa de Trade-offs Arquiteturais — Data Analytics

> Guia agnóstico de ferramenta para decisões arquiteturais em ambientes analíticos

---

## Introdução

Este documento mapeia os principais trade-offs arquiteturais enfrentados na concepção e evolução de ambientes de data analytics. Cada trade-off representa uma decisão com consequências reais em performance, governança, custo operacional e autonomia dos times.

O mapa é organizado em seis grupos temáticos, cada um cobrindo uma camada distinta da arquitetura analítica. As decisões dentro de cada grupo são interdependentes — a escolha em uma camada frequentemente restringe ou favorece escolhas em outras.

Este guia é deliberadamente agnóstico de ferramenta. Os princípios aqui descritos aplicam-se independentemente de qual plataforma, cloud provider ou stack tecnológico estiver em uso.

> **Como usar este documento:** cada par de trade-offs apresenta uma definição, as forças e fraquezas de cada opção, e sinais de contexto que ajudam a identificar qual alternativa é mais adequada. Quando dois pares são conceitualmente próximos, uma seção de distinção explica onde eles diferem.

---

## Estrutura do Mapa

- Grupo 1 — Integração e Movimento de Dados
- Grupo 2 — Topologia e Distribuição
- Grupo 3 — Modelagem
- Grupo 4 — Semântica e Governança
- Grupo 5 — Armazenamento
- Grupo 6 — Processamento

---

## Grupo 1 — Integração e Movimento de Dados

Este grupo cobre as decisões sobre como os dados chegam ao consumidor — se são movidos, replicados, transformados ou acessados diretamente na fonte. As três decisões deste grupo são relacionadas mas operam em dimensões distintas.

---

### 1.1 Federation vs. Replication

Federation mantém os dados na fonte e os acessa sob demanda, geralmente por meio de virtualização ou queries distribuídas. Replication copia os dados para um repositório centralizado ou intermediário, criando uma cópia controlada.

| Dimensão                 | Federation (Opção A)           | Replication (Opção B)                 |
| ------------------------ | ------------------------------ | ------------------------------------- |
| Latência de atualização  | Baixa — dados sempre frescos   | Alta — depende do ciclo de carga      |
| Performance de query     | Dependente da fonte            | Alta — dados locais e otimizados      |
| Custo de armazenamento   | Baixo — sem duplicação         | Alto — dados duplicados               |
| Resiliência              | Baixa — fonte é ponto de falha | Alta — independente da fonte          |
| Governança               | Complexa — dados dispersos     | Centralizada e auditável              |
| Transformações complexas | Limitadas                      | Amplas — dados disponíveis localmente |

**Quando escolher Federation**
- Dados precisam ser quase em tempo real e replicação introduziria latência inaceitável
- Volume de dados torna a replicação proibitiva em custo ou tempo
- A fonte é estável e performática o suficiente para suportar queries analíticas
- Requisitos de privacidade impedem a movimentação de dados

**Quando escolher Replication**
- Performance analítica é crítica e a fonte não suporta carga adicional de queries
- Transformações complexas são necessárias antes do consumo
- A fonte é instável, legada ou tem janelas de manutenção frequentes
- Histórico consolidado é necessário além do que a fonte retém

---

### 1.2 Zero-copy vs. ETL

Zero-copy acessa os dados diretamente onde estão, sem movê-los — usando virtualização, push-down ou acesso remoto. ETL (Extract, Transform, Load) extrai os dados da fonte, aplica transformações e carrega em um destino separado.

| Dimensão                      | Zero-copy (Opção A)             | ETL (Opção B)                                  |
| ----------------------------- | ------------------------------- | ---------------------------------------------- |
| Movimentação de dados         | Nenhuma                         | Explícita e controlada                         |
| Custo de armazenamento        | Mínimo                          | Duplicação necessária                          |
| Complexidade de transformação | Limitada ao push-down           | Ilimitada                                      |
| Latência                      | Mínima                          | Proporcional ao volume e frequência            |
| Controle de qualidade         | Na fonte                        | Intermediário — pode corrigir antes do destino |
| Isolamento da fonte           | Nenhum — carga vai para a fonte | Total — fonte não sofre carga analítica        |

> **Distinção importante: Zero-copy vs. Federation**
>
> Zero-copy e Federation são conceitos relacionados mas não equivalentes. Federation é uma decisão de topologia — os dados ficam onde estão. Zero-copy é uma estratégia de implementação dessa topologia, acessando os dados sem movê-los. É possível ter uma arquitetura federada que ainda usa ETL para algumas camadas — por exemplo, federando fontes mas replicando para uma camada intermediária de transformação. Zero-copy é uma forma de federation, mas federation não implica necessariamente zero-copy.

---

### 1.3 Event-driven vs. Batch

Event-driven processa cada evento no momento em que ele ocorre, aproximando o analytics do tempo real. Batch acumula dados durante um período e os processa em janelas definidas — horária, diária, semanal.

| Dimensão                      | Event-driven (Opção A)           | Batch (Opção B)                        |
| ----------------------------- | -------------------------------- | -------------------------------------- |
| Latência de dados             | Milissegundos a segundos         | Minutos a horas                        |
| Complexidade de implementação | Alta                             | Baixa a média                          |
| Custo operacional             | Alto — infraestrutura contínua   | Baixo — recursos sob demanda           |
| Consistência de dados         | Eventual                         | Forte — janela fechada e completa      |
| Casos de uso                  | Alertas, dashboards operacionais | Relatórios estratégicos, reconciliação |
| Reprocessamento               | Complexo                         | Simples — reexecutar a janela          |

> **Sinal de alerta**
>
> A maioria dos casos de uso analítico não exige tempo real — exige dados confiáveis. Antes de adotar event-driven, vale perguntar: qual é a decisão de negócio que depende de dados com menos de X minutos de latência? Se a resposta for vaga, batch com frequência alta (por exemplo, a cada 15 ou 30 minutos) pode entregar o mesmo valor com menor complexidade e custo.

---

## Grupo 2 — Topologia e Distribuição

Este grupo cobre a decisão mais ampla da arquitetura: como os dados e a responsabilidade sobre eles estão distribuídos na organização.

---

### 2.1 Centralization vs. Data Mesh

Centralização concentra dados, plataforma e responsabilidade em uma equipe ou função de dados. Data Mesh distribui o ownership dos dados por domínio de negócio, tratando cada domínio como produtor e consumidor de dados como produto.

| Dimensão                      | Centralização (Opção A)          | Data Mesh (Opção B)              |
| ----------------------------- | -------------------------------- | -------------------------------- |
| Ownership dos dados           | Equipe central de dados          | Times de domínio de negócio      |
| Consistência                  | Alta — governança unificada      | Requer contratos entre domínios  |
| Escalabilidade organizacional | Limitada — gargalo central       | Alta — paralela por domínio      |
| Tempo até valor               | Mais lento — dependência central | Mais rápido por domínio          |
| Custo de coordenação          | Baixo internamente               | Alto entre domínios              |
| Maturidade necessária         | Baixa                            | Alta — requer cultura de produto |

> **Distinção importante: Centralization vs. Data Mesh / Catálogo centralizado vs. Metadados descentralizados**
>
> Centralization vs. Data Mesh é uma decisão organizacional e arquitetural de alto nível: quem é dono dos dados, onde eles vivem e como a plataforma é governada como um todo. Envolve times, processos, infraestrutura e cultura.
>
> Catálogo centralizado vs. Metadados descentralizados (Grupo 4) é uma decisão dentro da camada de governança: independente de como os dados estão distribuídos, onde ficam as definições, linhagem e documentação dos ativos de dados.
>
> São decisões ortogonais. Uma organização pode adotar Data Mesh — com ownership distribuído por domínio — e ainda manter um catálogo centralizado de metadados para garantir descoberta e auditoria. A topologia dos dados não determina a topologia dos metadados.

**Quando escolher Centralização**
- Organização pequena ou com time de dados centralizado e bem estabelecido
- Consistência de dados entre áreas é crítica e os domínios não têm maturidade técnica
- Regulação exige controle centralizado e rastreabilidade unificada

**Quando caminhar para Data Mesh**
- A equipe central de dados virou gargalo e não consegue atender a velocidade dos domínios
- Os domínios têm maturidade técnica para assumir ownership de dados como produto
- A organização já opera com times autônomos e cultura de produto estabelecida

---

## Grupo 3 — Modelagem

Este grupo cobre as decisões sobre como os dados são estruturados para consumo analítico — tanto o momento em que a estrutura é aplicada quanto o padrão de modelagem escolhido.

---

### 3.1 Star Schema vs. Data Vault vs. Wide Table

Estes três padrões representam abordagens distintas para organizar dados em um ambiente analítico. A escolha entre eles depende de prioridades entre performance de query, flexibilidade para mudanças e rastreabilidade histórica.

| Dimensão                    | Star Schema                        | Data Vault                      | Wide Table (OBT)              |
| --------------------------- | ---------------------------------- | ------------------------------- | ----------------------------- |
| Performance de query        | Alta — joins simples e previsíveis | Média — requer mais joins       | Máxima — sem joins            |
| Flexibilidade para mudanças | Média                              | Alta — estrutura desacoplada    | Baixa — mudanças são custosas |
| Rastreabilidade histórica   | Média                              | Alta — auditoria nativa         | Baixa                         |
| Complexidade de modelagem   | Baixa                              | Alta                            | Mínima                        |
| Curva de aprendizado        | Baixa                              | Alta                            | Mínima                        |
| Melhor para                 | Relatórios e dashboards            | Auditoria e ambientes regulados | Grandes volumes analíticos    |

---

### 3.2 Schema-on-write vs. Schema-on-read

Schema-on-write define a estrutura dos dados antes de carregá-los — é o contrato clássico do data warehouse. Schema-on-read carrega os dados brutos e aplica a estrutura apenas no momento da consulta — é o modelo do data lake.

| Dimensão                    | Schema-on-write (Opção A)         | Schema-on-read (Opção B)            |
| --------------------------- | --------------------------------- | ----------------------------------- |
| Qualidade dos dados         | Garantida na entrada              | Responsabilidade do consumidor      |
| Performance de query        | Alta — dados já estruturados      | Variável — depende da query         |
| Flexibilidade de ingestão   | Baixa — esquema prévio necessário | Alta — qualquer formato aceito      |
| Custo de mudança de esquema | Alto                              | Baixo                               |
| Governança                  | Forte — schema validado           | Fraca — requer disciplina adicional |
| Tempo até ingestão          | Lento — modelagem prévia          | Rápido — dados chegam brutos        |

> **Distinção importante: Schema-on-write vs. padrões de modelagem**
>
> Schema-on-write vs. Schema-on-read decide quando a estrutura é aplicada — antes ou depois da ingestão. É uma decisão sobre o contrato com os dados na entrada do sistema.
>
> Star Schema, Data Vault e Wide Table decidem como os dados são estruturados depois que essa decisão foi tomada. Esses três padrões vivem predominantemente no universo schema-on-write — são modelos de organização dentro de um ambiente onde a estrutura já é definida na escrita. Não são alternativas à decisão anterior, mas sim especializações dela.

---

## Grupo 4 — Semântica e Governança

Este grupo cobre as decisões sobre onde a lógica de negócio reside e como os ativos de dados são documentados e descobertos. São decisões que afetam diretamente a confiança dos usuários nos dados.

---

### 4.1 Semantic Layer Centralizado vs. Cálculos no Frontend

Um semantic layer centralizado é uma camada intermediária onde as definições de KPIs, fórmulas e regras de negócio ficam armazenadas e são compartilhadas por todos os consumidores. Cálculos no frontend significa que cada ferramenta de visualização reimplementa a lógica que precisa internamente.

| Dimensão                      | Semantic Layer Centralizado (Opção A) | Cálculos no Frontend (Opção B)         |
| ----------------------------- | ------------------------------------- | -------------------------------------- |
| Consistência de KPIs          | Alta — uma definição, todos consomem  | Risco de divergência entre ferramentas |
| Agilidade do analista         | Menor — mudanças passam pela camada   | Alta — muda na própria ferramenta      |
| Governança                    | Forte e auditável                     | Fraca — lógica espalhada               |
| Dependência de ferramenta     | Baixa — lógica é portável             | Alta — lógica fica presa na ferramenta |
| Custo de manutenção           | Centralizado                          | Multiplicado por cada ferramenta       |
| Onboarding de nova ferramenta | Simples — consome a camada            | Custoso — reimplementa tudo            |

> **O problema que este trade-off resolve**
>
> Quando diferentes dashboards mostram valores diferentes para o mesmo KPI — "Receita Líquida" calculada de forma distinta em cada área — o problema raramente é técnico. É semântico: não existe uma definição centralizada que todos consomem. A ausência de um semantic layer centralizado é a causa raiz mais comum de perda de confiança nos dados em ambientes analíticos maduros.

---

### 4.2 Catálogo Centralizado vs. Metadados Descentralizados

Um catálogo centralizado documenta e governa todos os ativos de dados em um único lugar — definições, linhagem, classificação, ownership e políticas de acesso. Metadados descentralizados vivem próximos aos dados, gerenciados por cada domínio ou equipe responsável.

| Dimensão                   | Catálogo Centralizado (Opção A) | Metadados Descentralizados (Opção B)     |
| -------------------------- | ------------------------------- | ---------------------------------------- |
| Descoberta de dados        | Simples — um lugar para buscar  | Complexa — requer federação de catálogos |
| Consistência de definições | Alta                            | Requer contratos entre domínios          |
| Ownership dos metadados    | Equipe central                  | Times de domínio                         |
| Agilidade de atualização   | Menor — processo centralizado   | Alta — cada domínio atualiza o seu       |
| Auditoria e compliance     | Forte                           | Requer agregação entre domínios          |
| Escalabilidade             | Limitada — gargalo central      | Alta — paralela por domínio              |

> **Distinção importante: Catálogo vs. Topologia**
>
> É um equívoco comum assumir que Data Mesh exige metadados descentralizados ou que centralização exige um catálogo centralizado. As duas decisões são ortogonais.
>
> Uma organização pode adotar Data Mesh — ownership de dados distribuído por domínio — e ainda manter um catálogo centralizado de metadados para garantir que qualquer pessoa na empresa consiga descobrir, entender e auditar os dados disponíveis. A topologia dos dados não determina a topologia dos metadados.
>
> A escolha do catálogo deve ser guiada pelos requisitos de descoberta, auditoria e compliance — não pelo modelo de distribuição dos dados.

---

## Grupo 5 — Armazenamento

Este grupo cobre as decisões sobre onde e como os dados são fisicamente armazenados, considerando custo, performance e padrões de acesso.

---

### 5.1 Hot vs. Cold Storage

Hot storage mantém dados em infraestrutura de alta performance e custo elevado, otimizada para acesso frequente com baixa latência. Cold storage mantém dados em infraestrutura barata, tolerando latência maior para acesso eventual.

| Dimensão                    | Hot Storage (Opção A)                      | Cold Storage (Opção B)                          |
| --------------------------- | ------------------------------------------ | ----------------------------------------------- |
| Custo por GB                | Alto                                       | Baixo                                           |
| Latência de acesso          | Milissegundos                              | Segundos a minutos                              |
| Frequência de acesso típica | Diária ou horária                          | Mensal, trimestral ou eventual                  |
| Casos de uso                | Dashboards operacionais, relatórios ativos | Arquivo histórico, compliance, reprocessamento  |
| Ciclo de vida dos dados     | Curto — dados recentes                     | Longo — dados históricos ou raramente acessados |

> **Decisão prática**
>
> A maioria dos ambientes analíticos maduros usa os dois. A decisão real é definir a política de ciclo de vida: após quantos meses ou anos um dado migra de hot para cold? Essa política deve ser guiada pela frequência real de acesso — que raramente é medida — e pelo custo de manter dados quentes desnecessariamente.

---

### 5.2 Row-based vs. Columnar Storage

Armazenamento por linha mantém todos os campos de um registro juntos, otimizado para operações que acessam registros completos. Armazenamento colunar mantém todos os valores de um campo juntos, otimizado para analytics que varrem grandes volumes de poucas colunas.

| Dimensão                     | Row-based (Opção A)         | Columnar (Opção B)                      |
| ---------------------------- | --------------------------- | --------------------------------------- |
| Padrão de acesso             | Registro completo por vez   | Muitos registros, poucas colunas        |
| Casos de uso                 | Operacional, OLTP           | Analítico, OLAP                         |
| Compressão                   | Menor eficiência            | Alta — valores similares agrupados      |
| Performance de agregação     | Baixa                       | Alta                                    |
| Performance de insert/update | Alta                        | Baixa                                   |
| Uso típico                   | Sistemas transacionais, ERP | Data warehouses, plataformas analíticas |

> **Nota prática**
>
> A maioria das plataformas analíticas modernas usa armazenamento colunar por padrão. Esta decisão raramente é explícita — ela está embutida na escolha da plataforma. O que importa entender é o princípio: se uma query analítica está lenta em uma plataforma row-based, a causa raiz frequentemente é estrutural, não de otimização de query.

---

## Grupo 6 — Processamento

Este grupo cobre as decisões sobre onde e como a computação acontece — no hardware e na topologia do sistema.

---

### 6.1 In-memory vs. Disk-based Processing

Processamento in-memory carrega os dados na RAM antes de processar, eliminando I/O de disco e reduzindo latência drasticamente. Processamento disk-based lê e escreve dados no disco durante o processamento, permitindo escalar para volumes maiores que a memória disponível.

| Dimensão                        | In-memory (Opção A)                      | Disk-based (Opção B)                        |
| ------------------------------- | ---------------------------------------- | ------------------------------------------- |
| Latência                        | Mínima                                   | Maior — I/O de disco                        |
| Volume máximo                   | Limitado pela RAM disponível             | Praticamente ilimitado                      |
| Custo de infraestrutura         | Alto — RAM é cara                        | Menor — disco é barato                      |
| Throughput para grandes volumes | Baixo — não cabe em memória              | Alto — leitura/escrita paralela             |
| Casos de uso                    | Analytics interativo, queries frequentes | Processamento de grandes volumes históricos |

---

### 6.2 Push-down vs. Pull-up Computation

Push-down envia a lógica de computação para onde os dados estão, executando transformações e filtros no engine de armazenamento. Pull-up traz os dados para uma camada de processamento separada antes de computar.

| Dimensão                 | Push-down (Opção A)                 | Pull-up (Opção B)                              |
| ------------------------ | ----------------------------------- | ---------------------------------------------- |
| Transferência de dados   | Mínima — só o resultado viaja       | Total — dados brutos viajam para processamento |
| Aproveitamento do engine | Alto — usa otimizações nativas      | Parcial — processamento externo                |
| Controle da lógica       | Dependente das capacidades da fonte | Total — qualquer transformação                 |
| Latência de rede         | Baixa                               | Alta para grandes volumes                      |
| Casos de uso             | Filtros, agregações simples, joins  | Transformações complexas, lógica customizada   |

> **Distinção importante: In-memory vs. Push-down**
>
> In-memory vs. Disk-based decide onde o processamento acontece em termos de hardware — é uma característica do engine que executa a computação.
>
> Push-down vs. Pull-up decide quem executa a computação — o engine onde os dados residem ou uma camada separada. As duas decisões são independentes.
>
> Exemplos: um engine disk-based pode receber push-down de uma camada de orquestração. Um processamento pull-up pode acontecer em um engine in-memory. Push-down frequentemente implica aproveitar as otimizações de um engine in-memory quando o armazenamento assim o é — mas não necessariamente.

---

## Resumo: Mapa Completo de Trade-offs

| Grupo         | Trade-off                                 | Tensão Central                                                           |
| ------------- | ----------------------------------------- | ------------------------------------------------------------------------ |
| Integração    | Federation vs. Replication                | Onde os dados residem: na fonte ou em cópia controlada                   |
| Integração    | Zero-copy vs. ETL                         | Como os dados chegam ao consumidor: sem mover ou transformando           |
| Integração    | Event-driven vs. Batch                    | Quando processar: contínuo ou em janelas                                 |
| Topologia     | Centralization vs. Data Mesh              | Quem é responsável pelos dados: time central ou domínios                 |
| Modelagem     | Star Schema vs. Data Vault vs. Wide Table | Como estruturar: performance, auditoria ou simplicidade                  |
| Modelagem     | Schema-on-write vs. Schema-on-read        | Quando aplicar estrutura: na entrada ou na consulta                      |
| Semântica     | Semantic Layer Centralizado vs. Frontend  | Onde reside a lógica de negócio: camada compartilhada ou cada ferramenta |
| Semântica     | Catálogo Centralizado vs. Descentralizado | Onde ficam os metadados: único repositório ou junto aos dados            |
| Armazenamento | Hot vs. Cold Storage                      | Custo vs. latência de acesso por frequência de uso                       |
| Armazenamento | Row-based vs. Columnar                    | Acesso por registro (OLTP) vs. acesso por coluna (OLAP)                  |
| Processamento | In-memory vs. Disk-based                  | Velocidade vs. volume: RAM limitada mas rápida                           |
| Processamento | Push-down vs. Pull-up                     | Quem computa: o engine da fonte ou camada separada                       |

---

*Nenhum trade-off existe isolado. As decisões em um grupo restringem e influenciam as escolhas nos demais. A arquitetura é o resultado da composição dessas decisões, não de cada uma tomada individualmente.*