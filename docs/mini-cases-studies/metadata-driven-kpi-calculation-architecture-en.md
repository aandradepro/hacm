## Metadata-Driven KPI Calculation Architecture

### 1. Organizational Context

A corporate Business Intelligence platform, built on **SAP BW**, was used to produce executive reports for different business areas and countries.

As the platform evolved, reports accumulated an increasing number of BEx Queries and KPIs. A single workbook could use several queries; each query could work with multiple KPIs, MultiProviders, InfoCubes and filters.

The model worked, but the amount of processing required to generate reports began to result in high response times.

### 2. The Real Problem

KPIs were primarily calculated during report execution.

The existing architecture can be summarized as:

**Sources → InfoCubes → MultiProviders → BEx Queries → BEx Workbooks**

BEx Queries handled data selection, filtering and KPI calculations. Some KPIs contained formulas composed of several other KPIs. Because the architecture used multiple MultiProviders, these formulas had to be replicated across different queries.

The problem became more significant because each report could execute several queries, with each query repeating part of the required selections and calculations.

As a result, a significant amount of processing was concentrated at the moment the user requested a report.

### 3. Architectural Ambiguity

The primary architectural decision concerned **where the processing should take place**.

One option was to continue using the BEx layer to perform calculations and selections during report execution.

Another option was to move as much processing as possible to an earlier stage by creating a new layer between SAP BW persistence objects and presentation objects.

This second option required introducing a new persistent data layer and determining how its data would be produced.

The objective was to reduce the work repeatedly performed during report execution and make data already prepared for analysis available to consumers.

### 4. Architectural Decision

A dedicated KPI layer was created:

**Sources → InfoCubes → MultiProviders → Calculation Engine → KPI InfoCube → KPI MultiProvider → BEx Queries → BEx Workbooks**

The KPI InfoCube stored preprocessed data, primarily containing the indicator identification and its values, allowing the presentation layer to work with a much simpler structure.

The solution was developed **entirely within the SAP BW environment, using SAP NetWeaver capabilities**. No external platform was introduced to implement the engine, store the KPIs or manage their definitions.

After deciding to create this new layer, a second architectural question emerged: **how could the new layer be defined and populated in a sustainable way?**

The selected approach was a metadata-driven architecture.

### 5. Alternatives Considered

The new layer could have been populated through indicator-specific implementations, logic coded directly into the engine, or a structure in which indicator definitions were maintained independently from their implementation.

The first alternative would progressively reproduce the maintenance problem that existed in the reporting layer.

Coding each rule directly into the central engine would centralize execution, but business rules would remain coupled to the technical implementation.

The selected solution stored KPI definitions as metadata and made the Calculation Engine interpret those definitions.

There was a deliberate exception for **Level 0 indicators**. These indicators contained only filters over the InfoCubes and were obtained through a specific set of BEx Queries structured for this purpose. The decision to use these queries was architectural and functional; the Calculation Engine did not need direct access to the InfoCubes.

From these base indicators onward, the remaining KPIs were calculated progressively according to their dependencies.

### 6. Trade-offs Accepted

The solution introduced a new processing and persistence layer, increasing the initial complexity of the platform.

Development within the SAP NetWeaver environment was required for:

* structures to store KPI metadata;
* the rule interpretation and execution mechanism;
* structures to store calculated results;
* a KPI maintenance application;
* an execution monitoring and control cockpit.

This investment was accepted because it allowed processing to be removed from report execution and calculated results to be reused by all consumers.

It also changed the maintenance model: changes to KPI definitions could be made in metadata, reducing the need to modify presentation objects.

### 7. Implemented Solution

Each KPI was represented through a structured definition containing, among other elements:

* formula;
* component indicators;
* filters and selections;
* available drill-down dimensions;
* time perspectives, such as Month, Fiscal Year and YTD;
* processing level;
* dependencies between indicators.

The Calculation Engine processed indicators by level.

First, Level 0 indicators were obtained through the queries structured for this purpose. The engine then calculated indicators at subsequent levels using the formulas stored in the metadata.

An indicator's level was determined from its dependencies: when the highest level among its components was *n*, the indicator was assigned to level *n + 1*.

The results were persisted in the KPI InfoCube and subsequently made available through a KPI MultiProvider to the presentation BEx Queries.

The architecture also produced an additional artifact: the **Calculation Tree**.

Based on the metadata, a graphical HTML representation of each KPI could be generated, showing its formula, components and selections. This representation allowed analysts to inspect the KPI definition and compare it with its corresponding implementation.

### 8. Organizational Results

The solution became the basis for **all reports on the platform**, replacing distributed KPI processing with a centralized KPI layer.

Significant improvements were observed in:

* report execution time;
* overall processing time;
* number of queries required by reports;
* processing performed by the BEx layer;
* effort required to change and maintain KPIs.

A particularly relevant result was the change in the maintenance process.

Except for Level 0 indicators, **BEx Queries no longer needed to be modified when a KPI was changed**. This eliminated the need to transport query changes between development and production environments for those types of changes.

In addition, update tracking became KPI-based, providing a log directly associated with the business object being processed rather than with individual BEx Queries.

### 9. Architectural Lessons

The main lesson was the importance of examining **where processing takes place**, rather than simply optimizing the existing processing.

When the same rule is repeatedly executed by different reports, there is an architectural opportunity to move that processing to an earlier stage and make its result reusable.

The KPI layer addressed this problem structurally.

The metadata-driven architecture addressed a second challenge: how to allow the layer to scale without turning every new KPI into an independent implementation.

The resulting architecture established a clearer separation between:

* persisted data;
* processing and calculation;
* KPI definition;
* analytical consumption.

The Calculation Tree also demonstrated that the same metadata could support both automated execution and human understanding and validation of business rules.

### 10. Relevance to Modern Architectures

The architectural principle remains applicable to modern analytical environments.

Current platforms also need to determine which transformations should occur on demand and which should be materialized in advance, particularly when the same data and business rules are consumed repeatedly.

Likewise, modern architectures increasingly use metadata to describe models, dependencies, rules and business semantics.

The project demonstrates two principles that remain relevant:

1. **Moving recurring processing to an earlier layer can reduce query-time cost when the resulting data is broadly reusable.**
2. **Representing business rules as metadata can reduce coupling between semantics and implementation, supporting scale, maintainability and governance.**

The original technology was SAP BW/NetWeaver. The architectural decision, however, addresses a broader question: **how to structure an analytical architecture so that growth in the number of KPIs and consumers does not produce proportional growth in complexity and processing within the consumption layer.**
