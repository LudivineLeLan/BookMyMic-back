import { Booking } from "./booking.model.js";
import { Slot } from "./slot.model.js";
import { User } from "./user.model.js";
import { sequelize } from "./sequelize.client.js";

Slot.hasMany(Booking,
  { foreignKey: "slot_id" });

Booking.belongsTo(Slot,
  { foreignKey: "slot_id" });

Booking.belongsTo(User,
  { foreignKey: "user_id" });

User.hasMany(Booking,
  { foreignKey: "user_id" }
);


export { Booking, Slot, User, sequelize };