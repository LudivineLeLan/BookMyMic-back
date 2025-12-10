import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize.client.js";
import { Slot } from "./slot.model.js";

export class Booking extends Model { }

Booking.init(
  {
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slot_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Slot,
        key: "id"
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "user",
        key: "id",
      }
    }
  },
  {
    sequelize,
    tableName: "bookings",
    underscored: true
  }
);


