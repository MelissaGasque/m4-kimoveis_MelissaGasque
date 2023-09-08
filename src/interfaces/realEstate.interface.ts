import { z } from "zod";
import { createRealEstateSchema, realEstateSchema, showRealEstateSchema } from "../schemas/realEstates.schemas";

type RealEstateInterface = z.infer<typeof realEstateSchema>;
type CreateRealEstate = z.infer<typeof createRealEstateSchema>
type ShowRealEstate = z.infer<typeof showRealEstateSchema>

export { RealEstateInterface, CreateRealEstate, ShowRealEstate}