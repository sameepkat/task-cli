import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userControllers";
import { getUserProfile, JWTMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", JWTMiddleware, getUserProfile);

export default router;