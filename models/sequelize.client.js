import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
  },
});