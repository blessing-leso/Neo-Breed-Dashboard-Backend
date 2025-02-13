import mongoose from 'mongoose'
export async function connectDB() {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("MongoDB Connected Successfully")
    } catch (error) {
      console.error("MongoDB Connection Error:", error)
      process.exit(1) // Exit process on failure not exit normally
    }
  }