import { Sequelize } from "sequelize";
import { config } from "dotenv";
import User from "../models/User.model";
import Task from "../models/Task.model";

// Load environment variables from .env file
config();

// Extract environment variables
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

// Create a new instance of Sequelize
export const sequelize = new Sequelize(DB_NAME!, DB_USER!, DB_PASSWORD!, {
  host: DB_HOST,
  port: parseInt(DB_PORT ?? "0", 10),
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: false,
  },
});

export const conectDb = async () => {
  try {
    console.log("[db]: Connection has been established successfully.");
  } catch (error) {
    console.error("[db]: Unable to connect to the database:", error);
  }
};
