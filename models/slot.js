import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class Slot extends Model { }

Slot.init(
  {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: "slots",
    underscored: true
  }
);
