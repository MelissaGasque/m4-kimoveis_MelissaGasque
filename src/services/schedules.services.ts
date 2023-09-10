import { FindOneOptions, Repository } from "typeorm";
import { CreateSchedulesInterface, ShowAllRealEstateSchedules } from "../interfaces/schedules.interface";
import { RealEstate, Schedule, User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/App.errors";

export const createSchedulesService = async(payload: CreateSchedulesInterface, userId: number): Promise<{message:string}> => {
    const scheduleRepo: Repository<Schedule> = AppDataSource.getRepository(Schedule);
    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
   
    const realEstateId = payload.realEstateId;
    const verifyIdLength: FindOneOptions<RealEstate> = {
        where: { id: realEstateId },
    };
      
    const realEstate = await realEstateRepo.findOne(verifyIdLength);
     
    if (!realEstate) {
        throw new AppError("RealEstate not found", 404);
    };
    
    //O mesmo userId não pode agendar um mesmo horário/data em dois realEstateId
    const existingUserSchedule = await scheduleRepo.findOne({
        where: {
            user: { id: userId },
            date: payload.date,
            hour: payload.hour,
        },
    });

    if (existingUserSchedule) {
        throw new AppError("User schedule to this real estate at this date and time already exists", 409);
    };

    //Um realEstateId não pode ter mais de um agendamento data/hora
    const scheduleAlreadyExist = await scheduleRepo.findOne({
        where: {
            realEstate: { id: realEstateId },
            date: payload.date,
            hour: payload.hour,
        },
    });

    if (scheduleAlreadyExist) {
        throw new AppError("Schedule to this real estate at this date and time already exists", 409);
    };
        
    // Hora dentro do horário de trabalho
    const horarioInicio = '08:00';
    const horarioFim = '18:00';
    if (payload.hour < horarioInicio || payload.hour > horarioFim) {
        throw new AppError("Invalid hour, available times are 8AM to 18PM");
    };
    
    // Exemplo de verificação se a data é um dia útil (segunda a sexta-feira)
    const dataParseada = new Date(payload.date);
    const diaDaSemana = dataParseada.getDay();
    if (diaDaSemana === 0 || diaDaSemana === 6) { 
        throw new AppError("Invalid date, work days are monday to friday");
    };

    const schedule = scheduleRepo.create({
        date: payload.date, 
        hour: payload.hour,
        realEstate: {id: realEstateId},
        user: {id: userId} 
    });
   
    await scheduleRepo.save(schedule);
   
    return  ({"message":"Schedule created"});
};


export const readSchedulesServices = async (realEstateId: number, admin: boolean) => {
    
    if (admin === false){
      throw new AppError("Insufficient permission", 403);
    }

    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

    const realEstate = await  realEstateRepo.createQueryBuilder("realEstate")
        .leftJoinAndSelect("realEstate.address", "address")
        .leftJoinAndSelect("realEstate.category", "category")
        .leftJoinAndSelect("realEstate.schedule", "schedule")
        .leftJoinAndSelect("schedule.user", "user")   
        .where("realEstate.id = :id", { id: Number(realEstateId) })
        .getMany();

        const idExists = await realEstateRepo.findOneBy({id: Number(realEstateId)})

        if (!idExists) {
            throw new AppError("RealEstate not found", 404);
        }

        const formattedRealEstate = [];

        for (const item of realEstate) {
            const formattedItem = {
                address: item.address,
                category: item.category,
                createdAt: item.createdAt,
                id: item.id,
                schedules: [] as {
                    date: string;
                    hour: string;
                    id: number;
                    user: User;
                }[],
                size: item.size,
                sold: item.sold,
                updatedAt: item.updatedAt,
                value: item.value
            };
    
            for (const scheduleItem of item.schedule) {
                formattedItem.schedules.push({
                    date: scheduleItem.date,
                    hour: scheduleItem.hour,
                    id: scheduleItem.id,
                    user: scheduleItem.user
                });
            }
    
            formattedRealEstate.push(formattedItem);
        }
    
        return formattedRealEstate[0]; 
  };

