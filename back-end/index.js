//Dependencies
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectionDB } from "./config/database.js";
import userRoutes from "./routes/user.route.js";
import expenseRoutes from "./routes/expense.route.js";
import balanceRoutes from "./routes/balance.route.js";

dotenv.config();

const app = express();

//Port
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1", expenseRoutes);
app.use("/api/v1", balanceRoutes);

//Server
connectionDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
