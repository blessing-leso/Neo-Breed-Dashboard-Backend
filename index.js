import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import leadRoute from "./routes/LeadRouter.js";
import { router as companyRouter } from "./routes/companyRoutes.js";
import { router as employeeRouter } from "./routes/EmployeeRouter.js";

import clientRouter from "./routes/Clientsrouter.js";
const server = express();

//middlewares
server.use(cors());
server.use(json());
server.use(cookieParser());

server.use("/api/employees", employeeRouter);
server.use("/api/clients", clientRouter);
server.use("/api/companies", companyRouter);
server.use("/api/leads", leadRoute);
//connect to database
connectDB();

server.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port http://localhost:${process.env.PORT || 3000}`
  );
});
