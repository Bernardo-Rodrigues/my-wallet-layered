import { Router } from "express";
import * as authController from "../controllers/authController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";

const authRouter = Router();

authRouter.post("/sign-in", validateSchemaMiddleware, authController.signIn);

export default authRouter;