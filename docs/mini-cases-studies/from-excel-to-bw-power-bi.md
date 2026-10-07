## Mini Case — Estruturação de BI para substituir processos analíticos baseados em Excel

### Contexto

Ambiente em que usuários extraem informações do SAP ECC, consolidam e manipulam os dados em Excel e posteriormente utilizam Power BI para análise.

### Problema

O Excel funciona como camada intermediária não governada do processo analítico, concentrando transformações e consolidações que poderiam ser estruturadas no backend de BI.

Consequências potenciais:

- lógica de negócio distribuída entre usuários;
- dificuldade de rastrear transformações;
- duplicação de esforços;
- dependência de processos manuais;
- dificuldade de reutilização;
- risco de múltiplas interpretações dos mesmos dados;
- Power BI utilizado sobre dados previamente tratados de forma heterogênea.

### Abordagem

1. Identificar relatórios e processos recorrentes.
2. Separar necessidades legítimas de análise ad hoc das rotinas que deveriam ser institucionalizadas.
3. Identificar fontes e granularidade dos dados no ECC.
4. Transferir regras recorrentes e transformações para uma camada governada de BI.
5. Criar modelos BW reutilizáveis.
6. Disponibilizar os dados estruturados para Power BI.
7. Preservar Power BI como camada de consumo/visualização quando fizer sentido.
8. Priorizar casos de maior recorrência, impacto e esforço manual.

### Princípio arquitetural

O objetivo não é substituir Power BI por BW.

O objetivo é evitar que Power BI dependa de uma camada intermediária de Excel para regras de negócio e preparação recorrente dos dados.

### Conexão com experiência anterior

Relaciona-se diretamente às experiências de Datamart, soluções Excel–BW, automação e atuação como referência técnica para usuários de negócio.