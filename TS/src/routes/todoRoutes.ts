import express from "express";
import {
    createTodo,
    getUsersAllTodos,
} from "../controllers/toDoControllers";
import { JWTMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router
    .route("/")
    .post(JWTMiddleware, createTodo)
    .get(JWTMiddleware, getUsersAllTodos);

export default router;