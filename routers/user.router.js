import { Router } from "express";
import { userController } from "../controllers/user.controller";

export const userRouter = Router();

userRouter.post('/user/register', userController.createUser);
userRouter.post('/user/login', userController.loginUser);
userRouter.get('/user/:id/bookings', userController.getUserBookings)