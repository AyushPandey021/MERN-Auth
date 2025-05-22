import express from "express";
import { login, logout, signup } from "../controller/auth.controller.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login ", login);
router.post("/logout ", logout);

router.post("/verify-email",sendVerificationEmail)
export default router;



// time 1.23 min 