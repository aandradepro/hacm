Mini-case 1 — Diagnóstico de performance em Calculation View

Cenário

Você é responsável por uma solução analítica em SAP HANA baseada em uma Calculation View complexa.

A view combina diversas tabelas e outras Calculation Views. Após uma alteração recente, o tempo de execução aumentou significativamente.

Os usuários relatam que determinados relatórios, principalmente os utilizados durante o fechamento mensal, passaram a apresentar lentidão.

Problema

Você precisa identificar onde está o gargalo de performance e qual é sua causa, antes de propor alterações na arquitetura.

Considere que:

existem vários joins entre tabelas;
algumas tabelas possuem milhões de registros;
existem filtros aplicados pelo consumidor da view;
algumas relações deveriam ser 1:1, mas podem estar produzindo múltiplas linhas;
a solução precisa continuar atendendo análises detalhadas;
alterações estruturais ou persistência adicional devem ser justificadas.
Perguntas para trabalhar
Como você iniciaria o diagnóstico?
Quais ferramentas ou mecanismos utilizaria para identificar o ponto de maior custo?
Como verificaria se determinado join está causando multiplicação desnecessária de registros?
Que aspectos de join, cardinalidade, filtros, projeções e volume de dados você avaliaria?
Como diferenciaria um problema de modelagem de um problema de infraestrutura?
O que faria se o problema ocorresse somente em produção?
Que alternativas consideraria caso a otimização da Calculation View não fosse suficiente?
Objetivo do exercício

Construir uma resposta estruturada seguindo esta sequência:

Sintoma → reprodução → localização do gargalo → causa → correção → validação

O ponto principal não é listar técnicas de tuning, mas demonstrar um processo sistemático de diagnóstico.

A entrevista explorou exatamente esse tipo de cenário, incluindo joins, cardinalidade, filtros, volume e reprodução do problema em QA.