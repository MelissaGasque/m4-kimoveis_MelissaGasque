import { Repository } from "typeorm";
import { CreateRealEstate, RealEstateInterface, ShowRealEstate } from "../interfaces/realEstate.interface";
import { Address, Category, RealEstate } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/App.errors";


export const createPropertyService = async (payload: CreateRealEstate ): Promise< RealEstateInterface> => {
   
    const { address, categoryId, ...receivedBody} = payload;

    const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);
    const endereco: Address | null = await addressRepo.findOneBy(address);
    if(endereco){
        throw new AppError("Address already exists", 409);
    };

    const newAddress: Address | null = await addressRepo.save(address);

    const categoriesRepo: Repository<Category> = AppDataSource.getRepository(Category);
    const category: Category | null = await categoriesRepo.findOneBy({id: Number(categoryId)});
    if(!category){
        throw new AppError("Category not found", 409);
    };

    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
    const realEstate = await realEstateRepo.save({ ...receivedBody, address:newAddress, category:category});

   return realEstate;
};

export const showRealEstateService = async (): Promise<ShowRealEstate[]> => {
    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

    const showRealEstate = await realEstateRepo
    .createQueryBuilder('realEstate')
    .leftJoinAndSelect('realEstate.address', 'address')
    .getMany();

    return showRealEstate;
};