import { userSchema } from "./users.schemas";

export const loginRequest = userSchema.pick({
   email: true,
   password: true
});