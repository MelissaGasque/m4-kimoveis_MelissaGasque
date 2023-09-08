import { Router } from "express";
import { createRealEstateController, showRealEstateController } from "../controllers/realEstate.controller";
import { bodyValidated, isAdmTrue, verifyToken } from "../middlewares";
import { createRealEstateSchema } from "../schemas/realEstates.schemas";


export const realEstateRouter = Router();

realEstateRouter.post("", verifyToken, isAdmTrue, bodyValidated(createRealEstateSchema), createRealEstateController)
realEstateRouter.get("", showRealEstateController)