import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import { converter, handler, notFound } from "../api/middleware/error.js";
import { corsOptions } from "./corsConfig.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

const app = express();
config();
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(helmet());

app.use(cors(corsOptions));
app.use(cookieParser());

// app.use(converter);
// app.use(notFound);
// app.use(handler);

app.get("/api", (req, res) => res.send("OK"));

export default app;
