import express, { Express, Request, Response } from "express";
import { Authentication } from "../controllers/Authentication.controller";

const Router = express.Router();

Router.post('/callback', Authentication.callback);
Router.post('/refresh', Authentication.refresh);

export { Router as authRouter };