import express, { Express, Request, Response } from "express";
import { Authentication } from "../controllers/Authentication.controller";
import { TaskController } from "../controllers/Task.controller";
import { UserController } from "../controllers/User.controller";

const Router = express.Router();

Router.get("/users", Authentication.authenticate, UserController.getUsers);
export { Router as userRouter };
