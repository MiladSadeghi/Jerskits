import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import { converter, handler, notFound } from "../api/middleware/error.js";
import { corsOptions } from "./corsConfig.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import mainRoutes from "../api/routes/index.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname("../");

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/images", express.static(path.join(__dirname, "images")));
app.get("/api", (req, res) => res.send("OK"));
app.use("/api", mainRoutes);

app.use(converter);
app.use(notFound);
app.use(handler);

export default app;
