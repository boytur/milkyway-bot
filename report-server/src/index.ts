import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { conectDb, sequelize } from "./connection/connect";
import cors from "cors";


import { authRouter } from "./routes/Authentication.route";
import { taskRouter } from "./routes/Task.route";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  morgan<Request, Response>(
    process.env.NODE_ENV === "production" ? "combined" : "dev"
  )
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

app.use("/auth", authRouter);
app.use("/api", taskRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, async () => {
  try {
    await conectDb();
    console.log(`[server]: Server is running at http://localhost:${port}`);
  } catch (error) {
    console.error("Error starting server or syncing database:", error);
  }
});