import { Router } from "express";
import { getCity, getCountries, getStates } from "../controller/location.controller.js";

const locationRouter = Router();

locationRouter.get("/", getCountries);
locationRouter.get("/:countryCode", getStates);
locationRouter.get("/:countryCode/:stateCode", getCity);

export default locationRouter;