import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js"
import studentRoutes from "./routes/users.js"
import houseRoutes from "./routes/houses.js"
import { addHouse } from "./controllers/houses.js"
import userRoutes from "./routes/users.js"
// import postRoutes from "./routes/posts.js"
import { register, contactForm } from "./controllers/auth.js"
import { uploadFiles } from "./controllers/users.js";
import * as fs from 'fs'

//https://www.youtube.com/watch?v=VsUzmlZfYNg

// Configurations
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors({
  origin: ["http://localhost:3000", "https://re-lease.onrender.com"]
}));
// app.use("/assets", express.static(path.join(__dirname, 'public/assets')));  // Sets the directory for our assets (images). These will need to be stored in cloud storage later in production.

// File Storage Config - Set dfeault location for file storage
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    const {id} = req.params;  // Change the destination to be a subfolder of ./users/{userId}/profileFiles
    const path = `./public/users/${id}/`
    fs.mkdirSync(path, { recursive: true })
    cb(null, path);
  },
  filename: function(req, file, cb) {
    
    cb(null, `${file.fieldname}.pdf`);
  }
})
const upload = multer({storage: storage});

// Routes with files. Multer is a middleware that handles file upload. We can use upload.single() | upload.array() | upload.none()
// upload.fields is used because we're calling multer from a 2 file upload, both of which get their names from the formik field/ data model.
app.patch("/users/:id/uploadFiles", upload.fields([{name: "resume", maxCount: 1}, {name: "transcript", maxCount: 1}]), uploadFiles)

// Other routes (No file uploads, thus upload.none())
app.post("/auth/register", upload.none(), register);
app.post("/contactForm", upload.none(), contactForm)
app.use("/auth", upload.none(), authRoutes);
app.use("/house", upload.none(), houseRoutes)
app.use("/users", userRoutes);

// Mongoose setup
const CONNECT_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;

mongoose.set('strictQuery', true);
mongoose.connect(CONNECT_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
}).catch((e) => {
  console.log(e.message);
});

