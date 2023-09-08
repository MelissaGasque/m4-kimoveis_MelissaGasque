import { Router } from "express";
import { createUserController, readUsersController, softDeleteController, updateUserController } from "../controllers/users.controller";
import { bodyValidated, checkID, emailExists, isAdmTrue, verifyToken } from "../middlewares";
import { userCreateSchema } from "../schemas/users.schemas";



export const userRouter = Router();

userRouter.post("", bodyValidated(userCreateSchema), emailExists, createUserController);
userRouter.get("", verifyToken, isAdmTrue, readUsersController);
userRouter.use("/:id", checkID, verifyToken, isAdmTrue,)
userRouter.patch("/:id", checkID,  updateUserController);
userRouter.delete("/:id", softDeleteController)