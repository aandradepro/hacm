export * from './moving-kpi-processing-overview';
export * from './coordinating-enterprise-analytics';
export * from './from-ambiguity-to-architecture';
export * from './landing-page';
export * from './modeling-sap-and-non-sap-data-at-the-right-grain';

// Páginas detalhadas (case-study) — exportar com nomes explícitos para evitar conflitos
export {
    MovingKpiProcessingDetailPageSchema,
    type MovingKpiProcessingDetailPage,
    type ContentSection as MovingKpiContentSection,
    type ContentSection as _MovingKpiContentSection,
} from './moving-kpi-processing-detail';

export {
    ModelingSapAndNonSapDataDetailPageSchema,
    type ModelingSapAndNonSapDataDetailPage,
} from './modeling-sap-and-non-sap-data-detail';