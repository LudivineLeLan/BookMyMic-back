import { Booking } from "./booking.model.js";
import { Slot } from "./slot.model.js";
import { Sequelize } from "sequelize";

Slot.hasMany(Booking,
  { foreignKey: "slot_id" });

Booking.belongsTo(Slot,
  { foreignKey: "slot_id" });

export { Booking, Slot, Sequelize };