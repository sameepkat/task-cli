import { Request, Response } from "express";
import Todo from "../models/todoModel";

interface AuthenticatedUser extends Request{
  user?: any,
}

export const createTodo = async (req: AuthenticatedUser , res: Response) => {
  try {
    const user = req.user;
    if(!user){
      throw new Error("User error");
    }
    const { title, description } = req.body;
    const todo = await Todo.create({ title, description, userId: user._id });
    return res.status(201).json({
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    console.error("Error creating todo: ", error)

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getUsersAllTodos = async (req: Request, res: Response) => {
  try{

    const todos = await Todo.find();
    return res.status(200).json({
      message: "All todos",
      todos,
    });
  }catch(error){
    console.error("Error fetching todos: ", error);

    return res.status(500).json({
      message: "Internal Server Error",
    })
  }
};
