import express from "express"
import { authMiddleware, loginUser, logoutUser, registerUser } from '../../controllers/auth/auth-controller.js'

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.get("/authCheck", authMiddleware, (req, res) => {
    const user = req.user;
    res.json({
        success: true,
        message: 'Authenticated user',
        user
    }).status(200)
})

export default router