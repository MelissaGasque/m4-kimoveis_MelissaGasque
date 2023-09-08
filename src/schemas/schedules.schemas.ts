import { z } from "zod";

export const schedulesSchema = z.object({
    id: z.number().positive().int(),
    date: z.string(),
    hour: z.string(),
    realEstateId: z.number(),
    userId: z.number()
})

export const createSchedules = schedulesSchema.omit({
    id:true,
    userId: true
})