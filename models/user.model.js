import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class User extends Model { }


User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "user",
  }
);