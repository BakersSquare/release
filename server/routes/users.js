import express from "express";
import { getUser, getUserHouseInterests, addRemoveHouseInterest } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js"

// Split the USERS objects into a Student/Owner object. Then keep the similar functions in this route. We need to do this so our data model doesn't get whacky

const router = express.Router();

// Read routes
router.get("/:id", verifyToken, getUser); // Front end will send over an ID, and we'll call the database using this ID. This is how we do query strings from front to back

router.get("/:id/houseInterests", verifyToken, getUserHouseInterests);


////////////////////// UPDATE ROUTES //////////////
// Update house interest with new houseID
router.patch("/:id/updateHouse/:houseID", verifyToken, addRemoveHouseInterest)

// Update Profile pic
// router.patch("/:id/uploadPhoto", verifyToken, uploadPhoto)

// Update Resume
// router.patch("/:id/uploadResume", verifyToken, uploadResume)

// Update Transcript
// router.patch("/:id/uploadTranscript", verifyToken, uploadTranscript)

// Update Bio
// router.patch("/:id/updateBio", verifyToken, updateBio)

export default router;