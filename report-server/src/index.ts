import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { conectDb } from "../connection/connect";
import User from "../models/User.model";
import Task from "../models/Task.model";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(
  morgan<Request, Response>(
    process.env.NODE_ENV === "production" ? "combined" : "dev"
  )
);

app.get("/", async (req: Request, res: Response) => {
  try {
    const users = await Task.findAndCountAll({
    });
    return res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error getting data:", error);
    return res
      .status(500)
      .json({
        error: "Internal server error",
        message: (error as Error).message,
      });
  }
});

app.listen(port, async () => {
  try {
    await conectDb();
    console.log(`[server]: Server is running at http://localhost:${port}`);
  } catch (error) {
    console.error("Error starting server or syncing database:", error);
  }
});
