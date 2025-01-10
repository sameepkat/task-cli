import { Router, Request, Response } from "express";
import { loginUser, registerUser } from "../controllers/userControllers";
import { getUserProfile, JWTMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "This is the user Route defined in src/routes/userRoutes.ts",
    });
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", JWTMiddleware, getUserProfile);

export default router;