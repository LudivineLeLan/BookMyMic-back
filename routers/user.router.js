import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authentification.middleware.js";

export const userRouter = Router();

userRouter.post('/register', userController.createUser);
userRouter.post('/login', userController.loginUser);
userRouter.get('/me/bookings', authenticate, userController.getUserBookings);
userRouter.delete("/booking/:id", authenticate, userController.cancelBooking);
