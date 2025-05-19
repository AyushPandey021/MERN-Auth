import mongoose from "mongoose"

export const connectDB = async ()=>{
  try {
    console.log("mongo_url", process.env.MONGO);
    
  const conn =   await mongoose.connect(process.env.MONGO)
  console.log(`Mongo connected: ${conn.connection.host}`);
  
  } catch (error) {
    console.log("Error connection to mongo", error.message);
    process.exit(1)
    
  }
}