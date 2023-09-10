import { z } from "zod";
import { createSchedules, showAllRealEstateSchedules } from "../schemas/schedules.schemas";

type CreateSchedulesInterface = z.infer<typeof createSchedules>
type ShowAllRealEstateSchedules = z.infer<typeof showAllRealEstateSchedules>

export { CreateSchedulesInterface, ShowAllRealEstateSchedules }