//Dependencies
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectionDB } from "./config/database.js";
import adminRoutes from "./routes/admin.route.js";
import incomeRoutes from "./routes/income.route.js";
import courseCategoryRoutes from "./routes/courseCategory.route.js";
import courseRoutes from "./routes/course.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import expenseRoutes from "./routes/expense.route.js";
import expenseCateRoutes from "./routes/expense.cate.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();

//Port
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//Routes
app
  .use("/api/v1/admin", adminRoutes)
  .use("/api/v1/users", userRoutes)
  .use("/api/v1", expenseRoutes)
  .post("/api/v1/expense", expenseCateRoutes)
  .use("/api/v1", incomeRoutes)
  .use("/api/v1", dashboardRoutes)
  .use("/api/v1", courseCategoryRoutes)
  .use("/api/v1/courses", courseRoutes);

//Global error handling
app.use((error, req, res, next) => {
  res.status(500).json({
    message: "Server error",
    error,
  });
});

//Server
connectionDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Database connection failed...");
  });
