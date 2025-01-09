import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
if(!jwtSecret)
    throw new Error("JWT Secret Not found");


export const registerUser = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { name, email, password } = req.body;

        const userExists = await User.findOne({
            email,
        });

        if(userExists){
            res.status(400).json({
                message: "User already exists",
            });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            }
        );

        res.status(201).json({
            message: "User created successfully",
            user,
        });
        return;
    }catch(error){
        res.status(500).json({
            message: "Something went wrong",
        });
        return;
    }
};


export const loginUser = async(req: Request, res: Response, next: NextFunction )=>{
    try{
        const { email, password } = req.body;

        const dbUser = await User.findOne({
            email,
        });

        if(!dbUser){
            res.status(401).json({
                message: "Invalid credentials",
            });
            return;
        }

        const passwordFlag = await bcrypt.compare(password, dbUser.password);

        if(!passwordFlag){
            res.status(401).json({
                message: "Invalid credentials",
            });
            return;
        }
        
        const accessToken = jwt.sign(
            { userId: dbUser._id },
            jwtSecret, 
            {
                algorithm: "HS512",
                issuer: "TODO APP",
                expiresIn: "15m",
            }
        );

        res.status(200).json({
            message: "Login Successfull",
            token: accessToken,
        });
        return;
    }catch(error){
        res.status(500).json({
            message: "Something went wrong",
        });
        return;
    }
}