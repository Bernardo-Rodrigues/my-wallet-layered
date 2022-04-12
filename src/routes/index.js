import { Router } from "express";
import authRouter from "./authRouter.js";
import financialEventsRouter from "./financialEventsRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(authRouter);
router.use(financialEventsRouter);

export default router;