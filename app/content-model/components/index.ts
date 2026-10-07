import { z } from 'zod';  // ← Adicionar esta linha
import { TagsComponentSchema } from './tags';
import { QuoteComponentSchema } from './quote';
import { PointsComponentSchema } from './points';
import { FlowHDiagramComponentSchema } from './flowHDiagram';
import { FlowVDiagramComponentSchema } from './flowVDiagram';
import { FlowHInsetComponentSchema } from './flowHInset';
import { MessageComponentSchema } from './message';
import { SAPPerspectiveComponentSchema } from './SAPPerspective';
import { OrbitDiagramComponentSchema } from './orbitDiagram';
import { CardsComponentSchema } from './cards';
import { ListComponentSchema } from './list';
import { BalanceDiagramComponentSchema } from './balanceDiagram';
import { ConvergenceDiagramComponentSchema } from './convergenceDiagram';
import { RelationshipDiagramComponentSchema } from './relationshipDiagram';
import { PillarsComponentSchema } from './pillars';
import { PillsComponentSchema } from './pills';
import { StepsComponentSchema } from './steps';
import { FoundationDiagramComponentSchema } from './foundationDiagram';
import { ContactButtonsComponentSchema } from './contactButtons';
import { TradeoffsComponentSchema } from './tradeoffs';

// Discriminated Union
export const ComponentSchema = z.discriminatedUnion('componentType', [
    TagsComponentSchema,
    QuoteComponentSchema,
    PointsComponentSchema,
    FlowHDiagramComponentSchema,
    FlowVDiagramComponentSchema,
    FlowHInsetComponentSchema,
    MessageComponentSchema,
    SAPPerspectiveComponentSchema,
    OrbitDiagramComponentSchema,
    CardsComponentSchema,
    ListComponentSchema,
    BalanceDiagramComponentSchema,
    ConvergenceDiagramComponentSchema,
    RelationshipDiagramComponentSchema,
    PillarsComponentSchema,
    PillsComponentSchema,
    StepsComponentSchema,
    FoundationDiagramComponentSchema,
    ContactButtonsComponentSchema,
    TradeoffsComponentSchema,
]);

export type Component = z.infer<typeof ComponentSchema>;

// Exports
export * from './tags';
export * from './quote';
export * from './points';
export * from './flowHDiagram';
export * from './flowVDiagram';
export * from './flowHInset';
export * from './message';
export * from './SAPPerspective';
export * from './orbitDiagram';
export * from './cards';
export * from './list';
export * from './balanceDiagram';
export * from './convergenceDiagram';
export * from './relationshipDiagram';
export * from './pillars';
export * from './pills';
export * from './steps';
export * from './foundationDiagram';
export * from './contactButtons';
export * from './tradeoffs';
