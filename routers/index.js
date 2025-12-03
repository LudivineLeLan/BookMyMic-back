import { Router } from "express";
import { bookingRouter } from "./booking.router.js";
import { slotRouter } from "./slot.router.js";

export const apiRouter = Router();

apiRouter.use("/booking", bookingRouter);
apiRouter.use("/slots", slotRouter);