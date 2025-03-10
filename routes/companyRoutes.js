import { Router } from "express";
const router = Router();
import { authenticateToken } from "../controllers/authController.js";
import {
  createCompany,
  deleteCompany,
  getCompanies,
  getOneCompany,
  updateCompany,
} from "../controllers/companyController.js";
import { router as EmployeeRouter } from "./EmployeeRouter.js";
import ClientRouter from "./Clientsrouter.js";
import LeadRouter from "./LeadRouter.js";

router.use("/:id/employees", EmployeeRouter);
router.use("/:id/clients", ClientRouter);
router.use("/:id/leads", LeadRouter);

router.post("/createCompany", authenticateToken, createCompany);
router.get("/", authenticateToken, getCompanies);
router.get("/getSingleCompany/:id", authenticateToken, getOneCompany);
router
  .route("/:id")
  .patch(authenticateToken, updateCompany)
  .delete(authenticateToken, deleteCompany);

export { router };
