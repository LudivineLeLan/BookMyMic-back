import { Booking } from "./booking.model.js";
import { Slot } from "./slot.model.js";
import { sequelize } from "./sequelize.client.js";

Slot.hasMany(Booking,
  { foreignKey: "slot_id" });

Booking.belongsTo(Slot,
  { foreignKey: "slot_id" });

export { Booking, Slot, sequelize };