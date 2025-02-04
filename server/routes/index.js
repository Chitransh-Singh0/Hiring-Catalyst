import express from "express";

import authRoute from "./authRoutes.js";
import userRoute from "./userRoutes.js";
import companyRoute from "./companiesRoutes.js";
import jobRoute from "./jobsRoutes.js";


const router = express.Router();

const path = "/api-v1/";

router.use(`${path}auth`, authRoute); //api-v1/auth/
router.use(`${path}users`, userRoute); //api-v1/users/
router.use(`${path}companies`, companyRoute); //api-v1/companies/
router.use(`${path}jobs`, jobRoute); //api-v1/jobs/


export default router;