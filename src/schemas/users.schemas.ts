import { z } from "zod";

export const userSchema = z.object({
    id: z.number().positive().int(),
    name: z.string().max(45).nonempty(),
    email: z.string().max(45).email().nonempty(),
    admin: z.boolean().default(false),
    password: z.string().max(120).nonempty(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable()
});

export const userCreateSchema = userSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true
});
export const userCreateWithoutadmin =userCreateSchema.omit({admin: true});
export const userReturnSchema = userSchema.omit({password:true});
export const userReadSchema = userReturnSchema.array();
export const userUpdateSchema = userCreateSchema.partial();