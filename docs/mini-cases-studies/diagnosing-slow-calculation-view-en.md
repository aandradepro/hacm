Mini-case 1 — Diagnosing a Slow Calculation View
Scenario

You are responsible for an analytical solution built on SAP HANA Calculation Views.

The solution has become significantly slower after a recent change. Users report that some analytical queries, especially during critical business periods, now take several minutes to execute.

The Calculation View contains multiple joins and depends on other Calculation Views and database tables.

Problem

You need to identify where the performance bottleneck is and what is causing it, before deciding how to optimize the solution.

Consider that:

Some tables contain millions of records.
Several joins exist between the datasets.
Some relationships are expected to be 1:1.
Filters are applied by the consuming query.
One join may be producing significantly more records than expected.
The issue may occur only with certain business periods or selections.
You should avoid simply adding infrastructure resources without first understanding the root cause.
Questions to work through
How would you start the performance investigation?
How would you identify which part of the Calculation View is causing the problem?
What tools or techniques would you use?
How would you verify whether a join is producing unnecessary records?
What would you investigate regarding:
joins;
cardinality;
filters;
projections;
data volume;
keys and relationships?
How would you determine whether the problem is caused by the data model rather than by infrastructure?
How would you reproduce the problem safely in a non-production environment?
What optimization alternatives would you consider if the Calculation View itself remains expensive?
Exercise objective

Build your reasoning around:

Symptom → Reproduce → Locate bottleneck → Identify root cause → Optimize → Validate

The goal is not to produce a list of HANA performance techniques. The goal is to demonstrate a systematic