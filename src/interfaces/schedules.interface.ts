import { z } from "zod";
import { createSchedules } from "../schemas/schedules.schemas";

type CreateSchedulesInterface = z.infer<typeof createSchedules>

export { CreateSchedulesInterface }