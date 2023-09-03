import { z } from "zod";

export const categoriesSchema = z.object({
    id: z.number().positive().int(),
    name: z.string().max(45).nonempty(),
})
