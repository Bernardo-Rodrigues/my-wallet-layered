import cors from "cors";
import express from "express";
import "./setup.js";
import errorHandlingMiddleware from "./middlewares/errorHandlingMiddleware.js";
import router from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandlingMiddleware);

export default app;