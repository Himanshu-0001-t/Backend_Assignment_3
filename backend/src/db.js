import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://assignment:assignment@cluster0.zx1hfbw.mongodb.net/assignment")
        console.log("mongodb connected")

    } catch (error) {
        console.log(error)
    }
}

