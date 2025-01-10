import express, {Request, Response, NextFunction} from "express";
import path from "node:path";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import UserRoutes from "./src/routes/userRoutes";
import TodoRoutes from "./src/routes/todoRoutes";

dotenv.config();
const mongoURI = process.env.MONGO_URI;
if(!mongoURI)
    throw new Error("MongoURI error");

const app = express();

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) =>{
    res.status(200).json({
        message: "Server is running 2.",
    });
});

app.get("/view-profile", (req: Request, res: Response, next: NextFunction)=> {
    res.render("user", { user: "Sameep" });
});

app.use("/users", UserRoutes);
app.use("/todos", TodoRoutes);

(async() => {
    try {
        await mongoose.connect(mongoURI, {
            retryWrites: true,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            family: 4,
            maxPoolSize: 10,
            connectTimeoutMS: 30000,
        });
        console.log("DB Connected");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
})();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
