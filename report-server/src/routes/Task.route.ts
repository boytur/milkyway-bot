import express, { Express, Request, Response } from "express";
import { Authentication } from "../controllers/Authentication.controller";
import { TaskController } from "../controllers/Task.controller";

const Router = express.Router();

Router.get(
  "/my-tasks",
  Authentication.authenticate,
  TaskController.getUserTask
);
Router.get("/tasks", Authentication.authenticate, TaskController.getTasks);
Router.put("/tasks/:id", Authentication.authenticate, TaskController.updateTask);
export { Router as taskRouter };
