import express, { Router } from "express";
import { getCompanyProfile, signIn, register, getCompanyJobListing, updateCompanyProfile, getCompanies, getCompanyById } from "../controllers/companiesController.js";
import userAuth from "../middleware/authMiddleware.js"
import {rateLimit} from "express-rate-limit";

const router = express.Router();

//ip rate limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

//   Register
router.post('/register', limiter,register);

// LogIn
router.post('/login',limiter,signIn);

// get data
router.post('/get-company-profile',userAuth,getCompanyProfile);
router.post("/get-company-joblisting",userAuth, getCompanyJobListing);
router.get("/", getCompanies);
router.get("/get-company/:id", getCompanyById);

// Update data
router.put("/update-company", userAuth, updateCompanyProfile);

export default router;