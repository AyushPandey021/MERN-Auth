import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { connectDB } from "./DB/connectDB.js";
import authRoutes from "./routes/auth.route.js"
const app = express();
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())
dotenv.config()

app.use("/api/auth",authRoutes)
app.listen(PORT, () => {
  connectDB()
  console.log("server is runing on port: ", PORT);
});

