import logger from "./config/logger.js";
import app from "./config/express.js";
import { connect } from "./config/mongoose.js";
import { config } from "dotenv";

config();
connect();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  logger.info(`server started on port ${process.env.NODE_ENV}`)
);

export default app;
