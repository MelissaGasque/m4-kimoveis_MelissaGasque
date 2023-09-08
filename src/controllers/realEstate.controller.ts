import { Request, Response } from "express";
import { RealEstateInterface, ShowRealEstate } from "../interfaces/realEstate.interface";
import { createPropertyService, showRealEstateService } from "../services/realEstate.services";

//Criação de um imóvel
export const createRealEstateController = async(req: Request, res: Response): Promise<Response> => {
    const realEstate: RealEstateInterface = await createPropertyService(req.body);
    return res.status(201).json(realEstate);
};

//Lista todos os imóveis
export const showRealEstateController = async(req: Request, res: Response): Promise<Response> => {
    const realEstate: ShowRealEstate[] = await showRealEstateService();
    return res.status(200).json(realEstate);
};