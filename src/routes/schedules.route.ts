import { Router } from "express";
import { createSchedulesController, readSchedulesController } from "../controllers/schedules.controllers";
import { bodyValidated, isAdmTrue, verifyToken } from "../middlewares";
import { createSchedules } from "../schemas/schedules.schemas";

export const schedulesRouter = Router();

schedulesRouter.post("", verifyToken, bodyValidated(createSchedules), createSchedulesController);
schedulesRouter.get("/realEstate/:id", verifyToken, isAdmTrue, readSchedulesController);