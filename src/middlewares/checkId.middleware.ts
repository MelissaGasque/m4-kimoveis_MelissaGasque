import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors/App.errors";

export const checkID = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId: User | null = await AppDataSource.getRepository(User).findOneBy({id: Number(req.params.id)})
    if(!userId){
        throw new AppError("User not found", 404)
    }
    res.locals.userId = userId;
    return next()
}