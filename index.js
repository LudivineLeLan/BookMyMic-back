import "dotenv/config";
import express from "express";
import path from 'path';
import cors from "cors";
import { xss } from "express-xss-sanitizer";
import { apiRouter } from "./routers/index.js";
import { sequelize } from "./models/sequelize.client.js";
import { slotController } from "./controllers/slot.controller.js";


const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ["https://bookmymic.onrender.com",
    "http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(xss());

app.use('/uploads', express.static('uploads'));

app.use(apiRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve('path/to/build/index.html'));
});

app.listen(PORT, async () => {
  console.log(`Book My Mic is tuned on http://localhost:${PORT}`);
  try {
    await sequelize.sync({ alter: true });
    await slotController.seedSlotsIfEmpty();
    console.log("Database created & slots seeded!");
  } catch (error) {
    console.error("Error during DB init:", error);
  }
});