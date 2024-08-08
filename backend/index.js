import express from "express"
import userRouter from "./src/routers/user.router.js"
import { connectDB } from "./src/db.js"
import cors from "cors"

const app = express()

app.use(express.json({ limit: "20kb" }))
app.use(express.urlencoded({ limit: "20kb", extended: true }))

app.use(cors())

app.use("/api", userRouter)

connectDB().then(() => {
    app.listen(5000, () => console.log("Server is running on 5000"))
})