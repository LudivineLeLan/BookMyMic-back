import { Router } from "express";
import { slotController } from "../controllers/slot.controller.js";

export const slotRouter = Router();

slotRouter.get("/", slotController.getAllSlots);
