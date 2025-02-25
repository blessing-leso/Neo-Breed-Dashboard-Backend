import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import leadRoute from "./routes/LeadRouter.js";
import { router as companyRouter } from "./routes/companyRoutes.js";
import { router as employeeRouter } from "./routes/EmployeeRouter.js";
import callRouter from "./routes/callRoutes.js";
import clientRouter from "./routes/Clientsrouter.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";

const server = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  message: "Too many request from this IP",
});

//middlewares
server.use(cors());
server.use(json());
server.use(cookieParser());
server.use(limiter);
server.use(helmet());
//Data sanitization against NoSQL query injection
server.use(ExpressMongoSanitize());

server.use("/api/employees", employeeRouter);
server.use("/api/clients", clientRouter);
server.use("/api/companies", companyRouter);
server.use("/api/leads", leadRoute);
server.use("/api/calls", callRouter);
//connect to database
connectDB();

server.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port http://localhost:${process.env.PORT || 3000}`
  );
});
