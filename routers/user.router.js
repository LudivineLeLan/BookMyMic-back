import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.post('/register', userController.createUser);
userRouter.post('/login', userController.loginUser);
userRouter.get('/:id/bookings', userController.getUserBookings)