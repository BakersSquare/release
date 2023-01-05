import express from "express";
import { getUser, getUserHouseInterests, addRemoveHouseInterest } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js"

const router = express.Router();

// Read routes
router.get("/:id", verifyToken, getUser); // Front end will send over an ID, and we'll call the database using this ID. This is how we do query strings from front to back

router.get("/:id/houseInterests", verifyToken, getUserHouseInterests);

// Update routes
router.patch("/:id/:houseID", verifyToken, addRemoveHouseInterest)