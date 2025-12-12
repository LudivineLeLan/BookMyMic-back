import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authentifcation.middleware.js";

export const userRouter = Router();

userRouter.post('/register', userController.createUser);
userRouter.post('/login', userController.loginUser);
userRouter.get('/me/bookings', authenticate, userController.getUserBookings)