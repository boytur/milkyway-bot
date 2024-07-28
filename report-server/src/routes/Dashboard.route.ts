import express, { Request, Response } from "express";
import { DashboardController } from "../controllers/Dashboard.controller";
import { Authentication } from "../controllers/Authentication.controller";

const Router = express.Router();

Router.get("/reports", Authentication.authenticate,DashboardController.getReports);

export {Router as dashboardRouter};