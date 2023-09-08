 import { z } from "zod";
import { addressCreateSchema, addressesSchema } from "./addresses.schemas";
import { categoriesSchema } from "./categories.schemas";

export const realEstateSchema = z.object({
    id: z.number().positive().int(),
    sold: z.boolean().default(false),
    value: z.string().or(z.number().positive()).default(0),
    size: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    category: categoriesSchema,
    address: addressesSchema   
});

export const createRealEstateSchema = z.object({
    value: z.string().or(z.number().positive()).default(0),
    size: z.number().positive(),
    address: addressCreateSchema,
    categoryId: z.number().int().positive()
})

export const showRealEstateSchema = z.object({
    id: z.number().positive().int(),
    sold: z.boolean().default(false),
    value: z.string().or(z.number().positive()).default(0),
    size: z.number().positive(),
    createdAt: z.string(),
    updatedAt: z.string(),
    address: addressCreateSchema
})