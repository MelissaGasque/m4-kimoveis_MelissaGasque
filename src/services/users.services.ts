import { DeepPartial, Repository } from "typeorm";
import { UserCreateInterface, UserCreateWithoutadmin, UserReturn} from "../interfaces/users.interface";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { userReadSchema, userReturnSchema } from "../schemas/users.schemas";
import { AppError } from "../errors/App.errors";

export const createUserService = async(payload: UserCreateInterface | UserCreateWithoutadmin): Promise<UserReturn> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const user: UserReturn = userRepo.create(payload);
    await userRepo.save(user);
    return userReturnSchema.parse(user);
};

export const readUsersService = async(): Promise<UserReturn[]> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    return userReadSchema.parse(await userRepo.find());
};

export const updateUserService = async(payload: DeepPartial<User>, id: number ): Promise<UserReturn> => {
    const userRepo: Repository<User> | null = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id: Number(id) });
    if (!user) {
        throw new AppError('User not found', 404);
    }
    
    delete payload.id;
    delete payload.admin;

    const updateUser = await userRepo.save({...user, ...payload});
    return userReturnSchema.parse(updateUser);
};

export const softDeleteService = async (user:User): Promise<void> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    await userRepo.softRemove(user);
}