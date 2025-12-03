import { Router } from "express";
import { bookingController } from "../controllers/booking.controller.js";

export const bookingRouter = Router();

bookingRouter.get("/", bookingController.getAllBookings);

bookingRouter.post("/", bookingController.createBooking);
