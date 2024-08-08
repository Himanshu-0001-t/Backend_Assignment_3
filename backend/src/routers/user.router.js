import express from "express"
import { createUser, getUsers, updateUser, toggleLike, deleteUser } from "../controllers/user.controller.js"

const router = express.Router()

router.post('/user', createUser)
router.get('/user', getUsers)
router.post('/user/toggle', toggleLike)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

export default router