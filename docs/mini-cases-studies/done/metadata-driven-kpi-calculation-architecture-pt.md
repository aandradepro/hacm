## Metadata-Driven KPI Calculation Architecture

### 1. Contexto organizacional

Uma plataforma corporativa de Business Intelligence, construída sobre **SAP BW**, era utilizada para produzir relatórios executivos para diferentes áreas e países.

Com a evolução da plataforma, os relatórios passaram a concentrar um número crescente de BEx Queries e indicadores. Um único workbook podia utilizar várias queries; cada query podia trabalhar com diversos indicadores, MultiProviders, InfoCubes e filtros.

Esse modelo funcionava, mas o volume de processamento necessário para construir os relatórios passou a produzir tempos de resposta elevados.

### 2. Problema real

Os indicadores eram calculados principalmente durante a execução dos relatórios.

A arquitetura existente seguia, de forma simplificada:

**Fontes → InfoCubes → MultiProviders → BEx Queries → BEx Workbooks**

As BEx Queries concentravam seleção de dados, filtros e cálculos de indicadores. Alguns indicadores possuíam fórmulas compostas por vários outros indicadores. Como a arquitetura utilizava múltiplos MultiProviders, essas fórmulas precisavam ser replicadas em diferentes queries.

O problema se agravava porque cada relatório podia executar várias queries, cada uma realizando novamente parte das seleções e cálculos necessários.

O resultado era uma quantidade significativa de processamento concentrada no momento em que o usuário solicitava o relatório.

### 3. Ambiguidade encontrada

A principal decisão arquitetural estava relacionada à **localização do processamento**.

Era possível continuar utilizando a camada BEx para executar os cálculos e seleções durante a geração de cada relatório.

Outra possibilidade era antecipar o máximo possível desse processamento, criando uma nova camada entre os objetos de persistência do SAP BW e os objetos de apresentação.

Essa segunda opção exigia introduzir uma nova estrutura persistente e definir como seus dados seriam produzidos.

O objetivo era reduzir o trabalho realizado repetidamente durante a execução dos relatórios e disponibilizar dados já preparados para análise.

### 4. Decisão arquitetural

Foi criada uma camada específica para os KPIs:

**Fontes → InfoCubes → MultiProviders → Calculation Engine → KPI InfoCube → KPI MultiProvider → BEx Queries → BEx Workbooks**

O KPI InfoCube passou a armazenar dados já processados, contendo principalmente a identificação do indicador e seus valores, permitindo que a camada de apresentação trabalhasse sobre uma estrutura muito mais simples.

A solução foi desenvolvida **integralmente dentro do ambiente SAP BW, utilizando recursos do SAP NetWeaver**. Não foi introduzida uma plataforma externa para implementar o motor, armazenar os KPIs ou administrar suas definições.

Depois de decidir criar essa nova camada, surgiu uma segunda questão arquitetural: **como definir e carregar seus indicadores de maneira sustentável?**

A opção escolhida foi uma arquitetura orientada a metadados.

### 5. Alternativas consideradas

A nova camada poderia ser alimentada por implementações específicas para cada indicador, por lógica codificada diretamente no motor ou por uma estrutura de definições independente da implementação.

A primeira alternativa reproduziria progressivamente o problema de manutenção existente na camada de relatórios.

Codificar cada regra diretamente no motor centralizaria a execução, mas manteria as regras de negócio acopladas à implementação técnica.

A solução escolhida armazenava as definições dos indicadores como metadados e fazia o Calculation Engine interpretar essas definições.

Havia uma exceção deliberada para os indicadores de nível 0. Esses indicadores possuíam apenas filtros sobre os InfoCubes e eram obtidos por um conjunto específico de BEx Queries estruturadas para essa finalidade. A escolha de utilizar essas queries foi arquitetural e funcional; o Calculation Engine não precisava possuir acesso direto aos InfoCubes.

A partir desses indicadores de base, os demais eram calculados progressivamente conforme suas dependências.

### 6. Trade-offs aceitos

A solução introduziu uma nova camada de processamento e persistência, aumentando a complexidade inicial da plataforma.

Foi necessário desenvolver, dentro do próprio ambiente SAP NetWeaver:

* estruturas para armazenar os metadados dos KPIs;
* o mecanismo de interpretação das regras;
* estruturas para armazenar os resultados;
* uma aplicação de manutenção dos indicadores;
* um cockpit para monitoramento e controle das execuções.

Esse investimento foi aceito porque permitia retirar processamento da execução dos relatórios e reutilizar os resultados calculados por todos os consumidores.

Também houve uma mudança importante no modelo de manutenção: alterações na definição dos indicadores passaram a ocorrer nos metadados, reduzindo a necessidade de alterações nos objetos de apresentação.

### 7. Solução implementada

Cada KPI passou a possuir uma definição estruturada contendo, entre outros elementos:

* fórmula;
* indicadores componentes;
* filtros e seleções;
* dimensões disponíveis para drill-down;
* perspectivas temporais, como mês, fiscal year e YTD;
* nível de processamento;
* dependências entre indicadores.

O Calculation Engine processava os indicadores por nível.

Primeiro eram obtidos os indicadores de nível 0 através das queries estruturadas para esse propósito. Depois, o motor calculava os indicadores dos níveis seguintes utilizando as fórmulas armazenadas nos metadados.

O nível de cada indicador era determinado a partir de suas dependências: quando o maior nível entre seus componentes era *n*, o indicador era classificado no nível *n + 1*.

Os resultados eram persistidos no KPI InfoCube e posteriormente disponibilizados através de um KPI MultiProvider para as BEx Queries de apresentação.

A arquitetura também produziu um artefato adicional: a **Calculation Tree**.

A partir dos metadados, era possível gerar uma representação gráfica em HTML da composição de cada indicador, mostrando sua fórmula, componentes e seleções. Essa representação permitia aos analistas verificar a definição do KPI e compará-la com a implementação correspondente.

### 8. Resultados organizacionais

A solução passou a ser utilizada por **todos os relatórios da plataforma**, substituindo o processamento distribuído de indicadores por uma camada centralizada de KPIs.

Foram observadas melhorias consideráveis em:

* tempo de execução dos relatórios;
* tempo total de processamento;
* quantidade de queries necessárias para os relatórios;
* volume de processamento realizado pela camada BEx;
* esforço necessário para alterar e manter indicadores.

Um resultado particularmente relevante foi a mudança no processo de manutenção.

Com exceção dos indicadores de nível 0, **as BEx Queries deixaram de precisar ser alteradas quando um indicador era modificado**. Isso eliminou a necessidade de transportar alterações de queries entre ambientes de desenvolvimento e produção para mudanças desse tipo.

Além disso, o controle de atualização passou a ocorrer por KPI, fornecendo um registro mais diretamente associado ao objeto de negócio que estava sendo processado.

### 9. Lições arquiteturais

A principal lição foi a importância de analisar **onde o processamento acontece**, e não apenas como otimizar o processamento existente.

Quando a mesma regra é executada repetidamente por diferentes relatórios, existe uma oportunidade arquitetural de deslocar o processamento para uma etapa anterior e tornar o resultado reutilizável.

A criação da camada de KPIs resolveu esse problema de forma estrutural.

A arquitetura orientada a metadados resolveu uma segunda questão: como fazer essa camada crescer sem transformar cada novo indicador em uma implementação independente.

A consequência foi uma separação mais clara entre:

* dados persistidos;
* processamento e cálculo;
* definição dos indicadores;
* consumo analítico.

A Calculation Tree demonstrou ainda que os mesmos metadados podiam servir tanto à execução automática quanto à compreensão e validação humana das regras.

### 10. Relevância para arquiteturas modernas

O princípio arquitetural continua aplicável em ambientes analíticos modernos.

Plataformas atuais também precisam decidir quais transformações devem ocorrer sob demanda e quais devem ser materializadas previamente, especialmente quando os mesmos dados e regras são consumidos repetidamente.

Da mesma forma, arquiteturas modernas utilizam metadados para descrever modelos, dependências, regras e semântica de negócio.

O projeto demonstra dois princípios que permanecem relevantes:

1. **Mover processamento recorrente para uma camada anterior pode reduzir o custo da consulta quando seus resultados são amplamente reutilizados.**
2. **Representar regras de negócio como metadados pode reduzir o acoplamento entre semântica e implementação, facilitando escala, manutenção e governança.**

A tecnologia utilizada originalmente era SAP BW/NetWeaver. A decisão arquitetural, entretanto, trata de uma questão mais ampla: **como estruturar uma arquitetura analítica para que o crescimento do número de indicadores e consumidores não provoque crescimento proporcional da complexidade e do processamento na camada de consumo.**
