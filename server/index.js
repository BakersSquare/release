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
// import userRoutes from "./routes/users.js"
// import postRoutes from "./routes/posts.js"
import { register, contactForm } from "./controllers/auth.js"
import { verifyToken } from "./middleware/auth.js";

//https://www.youtube.com/watch?v=VsUzmlZfYNg

// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors({
  origin: ["http://localhost:3000", "https://re-lease.onrender.com"]
}));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));  // Sets the directory for our assets (images). These will need to be stored in cloud storage later in production.

// File Storage Config
const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
const upload = multer({storage});

// Routes with files. Multer is a middleware that handles file upload. We can use upload.single() | upload.array() | upload.none()
app.post("/auth/register", upload.single("picture"), register);
app.post("/contactForm", upload.none(), contactForm)

// Other routes (No file uploads, thus upload.none())
app.use("/auth", upload.none(), authRoutes);
app.use("/house", upload.none(), houseRoutes)

// He's using userRoutes to generically define the functions you should be able to use to grab information about generic users (Friends, profile info, etc). We will also need this because our application will have a houseArray + default profile info
// app.use("/users", userRoutes);
// app.use("/posts", postRoutes);

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

