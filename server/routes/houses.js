import express from "express";
import { getFeedHouses, getHomeownerHouses, favoriteHouse, addHouse } from "../controllers/houses.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedHouses)   // Gets all homes in the area to display
router.get("/:id/houses", verifyToken, getHomeownerHouses) // Gets a profiles houses

/* UPDATE */
router.patch("/:id/favoriteHouse", verifyToken, favoriteHouse);

/* CREATE */
router.post("/:id/addHouse", verifyToken, addHouse)
export default router;