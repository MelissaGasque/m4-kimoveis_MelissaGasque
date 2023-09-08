import { Request, Response } from "express";
import { createCategoryService, readCategoriesService, showAllRealEstateInCategoryService } from "../services/categories.services";

//Criação de categoria
export const createCategoryController = async(req: Request, res: Response): Promise<Response> => {
    const createCategory = await createCategoryService(req.body);
    return res.status(201).json(createCategory);
};

//Lista todas as categorias
export const readCategoriesController = async(req: Request, res: Response): Promise<Response> => {
    const categories = await readCategoriesService();
    return res.status(200).json(categories);
};

//Lista todos os imóveis que pertencem a uma categoria
export const showAllRealEstateInCategoryController = async(req: Request, res: Response): Promise<Response> => {
    const id: number = Number(req.params.id);
    const realEstateCategory = await showAllRealEstateInCategoryService(id);
    return res.status(200).json(realEstateCategory);
};