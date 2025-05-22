import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./DB/connectDB.js";
import authRoutes from "./routes/auth.route.js"
const app = express();
const PORT = process.env.PORT || 5000
app.use(express.json())
dotenv.config()

app.use("/api/auth",authRoutes)
app.listen(PORT, () => {
  connectDB()
  console.log("server is runing on port: ", PORT);
});

// mern stack
//H5FjOCLEinpiqNDh
// mongodb+srv://vlogayush51:H5FjOCLEinpiqNDh@cluster0.s4gd3fg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0