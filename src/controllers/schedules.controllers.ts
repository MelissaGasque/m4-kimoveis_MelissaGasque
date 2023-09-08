import { Request, Response } from "express";
import { createSchedulesService } from "../services/schedules.services";

//Agenda uma visita a um imóvel
export const createSchedulesController = async(req: Request, res: Response): Promise<Response> => {
    const { sub } = res.locals.decoded;
    const schedules = await createSchedulesService(req.body, sub)
    return res.status(201).json(schedules);
};
//lista todos os agendamentos de um imóve
// export const readSchedulesController = async(req: Request, res: Response): Promise<Response> => {
//     return res.status(200).json();
// };
