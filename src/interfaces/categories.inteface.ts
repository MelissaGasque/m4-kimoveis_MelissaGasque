import { z } from "zod";
import { categoriesSchema, categoryCreateSchema, categoryReadSchema } from "../schemas/categories.schemas";

type CategoryInterface = z.infer<typeof categoriesSchema>;
type CategoryCreateSchema = z.infer<typeof categoryCreateSchema>;
type CategoryReadSchema = z.infer<typeof categoryReadSchema>;

export { CategoryInterface, CategoryCreateSchema, CategoryReadSchema};