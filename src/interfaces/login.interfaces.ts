import { z } from "zod";
import { loginRequest } from "../schemas/login.schemas";

export type LoginRequest = z.infer<typeof loginRequest>;