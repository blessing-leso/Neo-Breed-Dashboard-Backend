import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import router from "./routes/EmployeeRouter.js";
import { router as leadRoute } from "./routes/LeadRouter.js";

const server = express();

//middlewares
server.use(cors());
server.use(json());
server.use(cookieParser());
server.use("/api", router);
server.use("/api", leadRoute);

//connect to database
connectDB();

server.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port http://localhost:${process.env.PORT || 3000}`
  );
});
