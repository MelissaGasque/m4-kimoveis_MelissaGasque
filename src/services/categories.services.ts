import { Repository } from "typeorm";
import { CategoryCreateSchema, CategoryInterface, CategoryReadSchema } from "../interfaces/categories.inteface";
import { Category } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/App.errors";

export const createCategoryService = async(payload: CategoryCreateSchema): Promise<CategoryInterface> => {
    const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category);
    const category: CategoryInterface = categoryRepo.create(payload);
    await categoryRepo.save(category);
    return category
}

export const readCategoriesService = async(): Promise<CategoryReadSchema> => {
    const userRepo: Repository<Category> = AppDataSource.getRepository(Category);
    return userRepo.find();
};

export const showAllRealEstateInCategoryService = async (categoryId: number) => { 
    const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category); 
    const category: Category | null = await categoryRepo.findOneBy({ id: Number(categoryId) });
    if(!category){
        throw new AppError("Category not found", 404);
    };

    const realEstateList = await categoryRepo.createQueryBuilder("category")
    .leftJoinAndSelect("category.realEstate", "realEstate")
    .where("category.id = :id", { id: Number(categoryId) })
    .getOne();

    return realEstateList;

};