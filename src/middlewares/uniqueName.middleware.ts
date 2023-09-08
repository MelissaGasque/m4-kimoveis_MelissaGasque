import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/App.errors";
import { Category } from "../entities";
import { AppDataSource } from "../data-source";

export const nameExists = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.body

    if(name){
        const nameAlreadyExist: Category | null = await AppDataSource.getRepository(Category).findOneBy({ name })
        
        if(nameAlreadyExist){
            throw new AppError("Category already exists", 409)
        }
    }


    return next()
}