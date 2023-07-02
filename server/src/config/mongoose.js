import mongoose from "mongoose";
import logger from "./logger.js";

mongoose.connection.on("error", (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

export const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.DB_NAME,
    })
    .then(() => console.log("mongoDB connected..."));
  return mongoose.connection;
};
