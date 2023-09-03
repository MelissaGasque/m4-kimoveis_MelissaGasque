 import { z } from "zod";

export const realEstateSchema = z.object({
    id: z.number().positive().int(),
    sold: z.boolean().default(false),
    value: z.number().positive().default(0),
    size: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    addressId: z.number(),
    categoryId: z.number()
});






