import { Router } from "express";
import { createUserController, readUsersController, updateUserController } from "../controllers/users.controller";
import { bodyValidated, checkID, emailExists, isAdmTrue, verifyToken } from "../middlewares";
import { userCreateSchema } from "../schemas/users.schemas";



export const userRouter = Router();

userRouter.post("", bodyValidated(userCreateSchema), emailExists, createUserController);
userRouter.get("", verifyToken, isAdmTrue, readUsersController);
userRouter.patch("/:id", verifyToken, isAdmTrue, updateUserController);