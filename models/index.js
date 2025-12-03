import { Booking } from "./booking";
import { Slot } from "./slot";
import { Sequelize } from "sequelize";

Slot.hasMany(Booking,
  { foreignKey: "slot_id" });

Booking.belongsTo(Slot,
  { foreignKey: "slot_id" });

export { Booking, Slot, Sequelize };