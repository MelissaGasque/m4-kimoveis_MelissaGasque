import { Router } from "express";
import { createSchedulesController } from "../controllers/schedules.controllers";
import { bodyValidated, verifyToken } from "../middlewares";
import { createSchedules } from "../schemas/schedules.schemas";

export const schedulesRouter = Router();

schedulesRouter.post("", verifyToken, bodyValidated(createSchedules), createSchedulesController);
// schedulesRouter.get("/realEstate/:id");