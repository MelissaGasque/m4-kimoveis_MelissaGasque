import { sign } from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors/App.errors";
import { LoginRequest } from "../interfaces/login.interfaces";
import { compare } from "bcryptjs";

export const loginService = async (payload: LoginRequest): Promise<string> => {
    const loginRepo = AppDataSource.getRepository(User);

    const user: User | null = await loginRepo.findOne({ where: {email: payload.email}})
    if(!user){
        throw new AppError("Invalid credentials", 401)
    }
    const matchPassword: boolean = await compare(payload.password.toString(), user.password);
    
    if (!matchPassword) {
        throw new AppError("Invalid credentials", 401);
    }

    const token: string = sign(
        { email: user.email, admin: user.admin, idToken: user.id }, 
        process.env.SECRET_KEY!,
        {
            expiresIn: process.env.EXPIRES_IN!,
            subject: user.id.toString(),
        }
    );

    return token
        
} 
