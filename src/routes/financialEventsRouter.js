import { Router } from "express";
import * as financialEventsController from "../controllers/financialController.js"

const financialEventsRouter = Router();

financialEventsRouter.post("/financial-events", financialEventsController.createEvent);
financialEventsRouter.get("/financial-events", financialEventsController.listUserEvents);
financialEventsRouter.get("/financial-events/sum", financialEventsController.getFinancialSum);

export default financialEventsRouter;