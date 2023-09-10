import { z } from "zod";
import { userSchema } from "./users.schemas";
import { showRealEstateSchema2 } from "./realEstates.schemas";
import { addressesSchema } from "./addresses.schemas";
import { categoriesSchema } from "./categories.schemas";

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

export const showAllRealEstateSchedules = z.object({
    id: z.number().int(),
    date: z.string(),
    hour: z.string(),
    user: userSchema,
    realEstate:showRealEstateSchema2,
    address: addressesSchema,
    category: categoriesSchema
})
