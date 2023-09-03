import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors/App.errors";

export const checkID = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = AppDataSource.getRepository(User).findOneBy({id: Number(req.params.id)})
    console.log(userId)
    if(!userId){
        throw new AppError("User not found", 404)
    }

    return next()
}