import { Router } from "express"
import { loginController } from "../controllers/login.controller"
import { loginRequest } from "../schemas/login.schemas"
import { bodyValidated } from "../middlewares"

export const loginRouter: Router = Router()

loginRouter.post("", bodyValidated(loginRequest), loginController) 