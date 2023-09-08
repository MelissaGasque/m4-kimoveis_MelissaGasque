import { Router } from "express";
import { createCategoryController, readCategoriesController, showAllRealEstateInCategoryController} from "../controllers/categories.controllers";
import { verifyToken, isAdmTrue, nameExists, checkID } from "../middlewares";

export const categoriesRouter = Router();

categoriesRouter.post("", verifyToken, isAdmTrue, nameExists, createCategoryController);
categoriesRouter.get("", readCategoriesController);
categoriesRouter.get("/:id/realEstate", showAllRealEstateInCategoryController)
