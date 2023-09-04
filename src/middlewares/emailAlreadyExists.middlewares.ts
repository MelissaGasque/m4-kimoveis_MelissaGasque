import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entities"
import { AppError } from "../errors/App.errors"

export const emailExists = async(req: Request, res:Response, next: NextFunction): Promise<void> => {
    const { email} = req.body
    if(email){
        const emailAlreadyExist: User | null = await AppDataSource.getRepository(User).findOneBy({ email })
    
        if(emailAlreadyExist ){
            throw new AppError("Email already exists", 409)
        }
        
        res.locals = {...res, movie: emailAlreadyExist}
    }
 
    return next()
} 