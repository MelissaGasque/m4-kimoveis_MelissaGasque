import { z } from "zod";

export const addressesSchema = z.object({
    id: z.number().positive().int(),
    street: z.string().max(45).nonempty(),
    zipCode: z.string().max(8).nonempty(),
    number: z.number(),
    city: z.string().max(20),
    state: z.string().max(2)
});

export const addressCreateSchema = addressesSchema.omit({
    id: true
})

