import { z } from 'zod';
import { ComponentBaseSchema } from '@/content-model/common';

export const TradeoffPairSchema = z.tuple([
    z.string(),
    z.string(),
]);

export type TradeoffPair = z.infer<typeof TradeoffPairSchema>;

export const TradeoffsContentSchema = z.object({
    title: z.string().optional(),
    items: z.array(TradeoffPairSchema),
});

export type TradeoffsContent = z.infer<typeof TradeoffsContentSchema>;

export const TradeoffsComponentSchema = ComponentBaseSchema.extend({
    componentType: z.literal('tradeoffs'),
    content: TradeoffsContentSchema,
});

export type TradeoffsComponent = z.infer<typeof TradeoffsComponentSchema>;