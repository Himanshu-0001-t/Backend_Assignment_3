import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    web: {
        type: String,
        required: true
    },
    liked: {
        type: Boolean,
        default: false
    }
})

const User = await mongoose.model("User", userSchema)

export default User