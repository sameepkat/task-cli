import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import * as dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

interface AuthenticatedUser extends Request {
    user?: any;
}

interface JwtPayload {
    userId: string;
    iat?: number;
    exp?: number;
}

export const JWTMiddleware = async (req: AuthenticatedUser, res: Response, next: NextFunction) => {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            res.status(401).json({
                message: "Unauthorized 1",
            });
            return;
        }

        console.log("Bearer Token: ", bearerToken);
        const accessToken = bearerToken.split(" ")[1];
        if (!accessToken) {
            res.status(401).json({
                message: "Unauthorized 2",
            });
            return;
        }

        console.log("Access Token: ", accessToken);

        const decodedToken = jwt.verify(accessToken, jwtSecret) as JwtPayload;
        console.log("Decoded Token: ", decodedToken);

        const user = await User.findById(decodedToken.userId);
        if (!user) {
            res.status(401).json({
                message: "Unauthorized 3",
            });
            return;
        }

        const { password, ...userWithoutPassword } = user.toJSON();
        console.log("Password and User without password: ", password, userWithoutPassword);
        
        // Attach the user to the request object
        req.user = userWithoutPassword;

        // Move to the next middleware/route handler
        next();
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized last",
        });
        return;
    }
};

export const getUserProfile = async (req: AuthenticatedUser, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        return res.status(200).json({ message: "Profile fetched successfully", user, });
        next();
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong!", });
         }
};
