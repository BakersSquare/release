import express from 'express';
import { login, emailInterest } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/emailInterest", emailInterest);

export default router;