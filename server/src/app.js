import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import logger from "./middleware/logger.js";
import notFound from "./middleware/notFound.js";
import errorHandle from "./middleware/errorHandler.js";

import routes from "./routes/index.js";
import config from "./config/env.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: config.CLIENT_URL,
    credentials: true,
  })
);

app.use(logger);

app.use("/uploads", express.static("uploads"));

app.use("/api", routes);

app.use(notFound);

app.use(errorHandle);

export default app;