import Tags from '@/components/ui/Tags';
import Quote from '@/components/ui/Quote';
import Points from '@/components/ui/Points';
import FlowHDiagram from '@/components/ui/FlowHDiagram';
import FlowVDiagram from '@/components/ui/FlowVDiagram';
import Message from '@/components/ui/Message';
import SAPPerspective from '@/components/ui/SAPPerspective';
import OrbitDiagram from '@/components/ui/OrbitDiagram';
import Cards from '@/components/ui/Cards';
import List from '@/components/ui/List';
import BalanceDiagram from '@/components/ui/BalanceDiagram';
import ConvergenceDiagram from '@/components/ui/ConvergenceDiagram';
import RelationshipDiagram from '@/components/ui/RelationshipDiagram';
import Pillars from '@/components/ui/Pillars';
import Pills from '@/components/ui/Pills';
import Steps from '@/components/ui/Steps';                              // ← Corrigido: Steps (não ApproachSteps)
import FoundationDiagram from '@/components/ui/FoundationDiagram';
import ContactButtons from '@/components/ui/ContactButtons';

export const componentRegistry = {
    tags: Tags,
    quote: Quote,
    points: Points,
    flowHDiagram: FlowHDiagram,
    flowVDiagram: FlowVDiagram,
    message: Message,
    SAPPerspective: SAPPerspective,
    orbitDiagram: OrbitDiagram,
    cards: Cards,
    list: List,
    balanceDiagram: BalanceDiagram,
    convergenceDiagram: ConvergenceDiagram,
    relationshipDiagram: RelationshipDiagram,
    pillars: Pillars,
    pills: Pills,
    steps: Steps,                                 // ← Corrigido: steps (não approachSteps)
    foundationDiagram: FoundationDiagram,
    contactButtons: ContactButtons,
} as const;

export type ComponentType = keyof typeof componentRegistry;

export const componentPropsMapper: Record<ComponentType, (content: any) => any> = {
    tags: (content) => ({ items: content.items }),
    quote: (content) => ({ text: content.text }),
    points: (content) => ({ items: content.items }),
    flowHDiagram: (content) => ({ title: content.title, steps: content.steps }),
    flowVDiagram: (content) => ({ title: content.title, steps: content.steps }),
    message: (content) => ({ text: content.text }),
    SAPPerspective: (content) => ({ text: content.items }),
    orbitDiagram: (content) => ({
        center: content.center,
        nodes: content.nodes,
        outcome: content.outcome,
        cycleText: content.cycleText,
    }),
    cards: (content) => ({
        items: content.items,
        columns: content.columns,
    }),
    list: (content) => ({ items: content.items }),
    balanceDiagram: (content) => ({ data: content }),
    convergenceDiagram: (content) => ({
        center: content.center,
        nodes: content.nodes,
    }),
    relationshipDiagram: (content) => ({
        subject: content.subject,
        verb: content.verb,
        object: content.object,
        meaning: content.meaning,
    }),
    pillars: (content) => ({
        items: content.items,
        columns: content.columns || 3
    }),
    pills: (content) => ({ items: content.items }),
    steps: (content) => ({
        items: content.items,
        columns: content.columns || 4,
    }),
    foundationDiagram: (content) => ({ data: content }),
    contactButtons: (content) => ({ contact: content }),
};

export function getComponent(type: ComponentType) {
    return componentRegistry[type];
}

export function mapComponentProps(type: ComponentType, content: any) {
    const mapper = componentPropsMapper[type];
    return mapper ? mapper(content) : content;
}

export function hasComponent(type: string): type is ComponentType {
    return type in componentRegistry;
}