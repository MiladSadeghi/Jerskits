import logger from "./config/logger.js";
import app from "./config/express.js";
import { connect } from "./config/mongoose.js";
import { config } from "dotenv";
import fs from "fs";

config();
connect();

if (!fs.existsSync("images")) {
  fs.mkdirSync("images", { recursive: true });
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  logger.info(`server started on port ${process.env.NODE_ENV}`)
);

export default app;
