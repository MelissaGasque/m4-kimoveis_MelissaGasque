import { Request, Response } from "express";
import { createUserService, readUsersService, updateUserService } from "../services/users.services"
import { UserReturn } from "../interfaces/users.interface";


//Criação de usuários -> Sem autentificação necessária
export const createUserController = async(req: Request, res: Response): Promise<Response> => {
    const user: UserReturn = await createUserService(req.body);
    return res.status(201).json(user);
};

//Lista todos os usuários -> Apenas administradires
export const readUsersController = async(req: Request, res: Response): Promise<Response> => {
    const users = await readUsersService();
    return res.status(200).json(users);
};

// 	Atualiza um usuário -> Apenas administradores ou dono da conta
export const updateUserController = async(req: Request, res: Response): Promise<Response> => {
    const id: number = Number(req.params.id);
    const updateUser = req.body;
    const update = await updateUserService(updateUser, id);
    return res.status(200).json(update);
};

//Realiza um soft delete no usuário