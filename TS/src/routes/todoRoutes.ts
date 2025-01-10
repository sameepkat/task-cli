import { Router } from "express";
import {
    createTodo,
    getUsersAllTodos,
} from "../controllers/toDoControllers";
import { JWTMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router
    .route("/")
    .post(JWTMiddleware, createTodo)
    .get(JWTMiddleware, getUsersAllTodos);

export default router;