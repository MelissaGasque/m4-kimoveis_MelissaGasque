import 'reflect-metadata';
import 'express-async-errors';
import express, { Application } from 'express';
import { handleErrors } from './errors/handleErrors';
import { userRouter } from './routes/users.route';
import { loginRouter } from './routes/login.route';

const app: Application = express();
app.use(express.json());

app.use("/users", userRouter)
app.use("/login", loginRouter)

app.use(handleErrors)

export default app;
