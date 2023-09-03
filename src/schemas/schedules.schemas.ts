import { z } from "zod";

export const schedulesSchema = z.object({
    id: z.number().positive().int(),
    date: z.date(),
    hour: z.string(),
    realEstateId: z.number(),
    userId: z.number()
})
