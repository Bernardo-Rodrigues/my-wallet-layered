import { Router } from "express";
import * as financialEventsController from "../controllers/financialController.js"
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const financialEventsRouter = Router();

financialEventsRouter.post("/financial-events", validateTokenMiddleware, validateSchemaMiddleware, financialEventsController.createEvent);
financialEventsRouter.get("/financial-events", validateTokenMiddleware, financialEventsController.listUserEvents);
financialEventsRouter.get("/financial-events/sum", validateTokenMiddleware, financialEventsController.getFinancialSum);

export default financialEventsRouter;