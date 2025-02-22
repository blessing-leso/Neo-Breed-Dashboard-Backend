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

router.use("/:id/employees", EmployeeRouter);
router.post("/createCompany", authenticateToken, createCompany);
router.get("/", authenticateToken, getCompanies);
router.get("/getSingleCompany/:id", authenticateToken, getOneCompany);
router
  .route("/:companyId")
  .patch(authenticateToken, updateCompany)
  .delete(authenticateToken, deleteCompany);

export { router };
