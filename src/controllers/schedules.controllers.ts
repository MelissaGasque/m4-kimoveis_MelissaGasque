import { Request, Response } from "express";
import { createSchedulesService, readSchedulesServices } from "../services/schedules.services";

//Agenda uma visita a um imóvel
export const createSchedulesController = async(req: Request, res: Response): Promise<Response> => {
    const { sub } = res.locals.decoded;
    const schedules = await createSchedulesService(req.body, sub);
    return res.status(201).json(schedules);
};
// lista todos os agendamentos de um imóve
export const readSchedulesController = async(req: Request, res: Response): Promise<Response> => {
    const { admin } = res.locals.decoded;
    const id: number = Number(req.params.id);
    const schedulesRealEstate = await readSchedulesServices(id, admin);
    return res.status(200).json(schedulesRealEstate);
};
