import express from "express";
import {rateLimit} from "express-rate-limit";
import { register, signIn } from "../controllers/authController.js";

// IP address limit
const limiter =  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true, //Retuen rate limit info
    legacyHeaders: false, // disable the 'X-rateLimit' headers
});

const router = express.Router();

// Register routes
router.post("/register",limiter, register);
router.post("/login", signIn);

export default router;