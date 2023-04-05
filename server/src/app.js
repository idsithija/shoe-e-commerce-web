import * as config from "./utils/config";
import express, { json } from "express";
import cors from "cors";
import * as logger from "./utils/logger";
import mongoose from "mongoose";
import identityService from "./controllers/identityService";
import {
  errorHandler,
  requestLogger,
  unknownEndpoint,
} from "./utils/midddleware";

mongoose
  .connect(config.MONGOOSE_URL)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("error connecting to MongoDB", err);
  });

const app = express();
app.use(cors());
app.use(json());
app.use(requestLogger);

app.use("/api", identityService);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
