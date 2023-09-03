import { z } from "zod";
import { userCreateSchema, userCreateWithoutadmin, userReturnSchema, userSchema, userUpdateSchema } from "../schemas/users.schemas";

type UserInterface = z.infer<typeof userSchema>;
type UserCreateInterface = z.infer<typeof userCreateSchema>;
type UserCreateWithoutadmin = z.infer<typeof userCreateWithoutadmin>;
type UserReturn = z.infer<typeof userReturnSchema>;
type UserUpdate = z.infer<typeof userUpdateSchema>;

export { UserCreateInterface, UserInterface, UserCreateWithoutadmin, UserReturn, UserUpdate};