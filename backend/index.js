import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./DB/connectDB.js";
import authRoutes from "./routes/auth.route.js"
const app = express();
dotenv.config()
app.get("/",(req,res)=>{
res.send("hello world")
})
app.use("/api/auth",authRoutes)
app.listen(3000, () => {
  connectDB()
  console.log("server is runing on port 3000");
});

// mern stack
//H5FjOCLEinpiqNDh
// mongodb+srv://vlogayush51:H5FjOCLEinpiqNDh@cluster0.s4gd3fg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0