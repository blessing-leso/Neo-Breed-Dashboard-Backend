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

router.use("/:companyId/employee", EmployeeRouter);
router.post("/createCompany", authenticateToken, createCompany);
router.get("/", authenticateToken, getCompanies);
router
  .route("/:companyId")
  .patch(authenticateToken, updateCompany)
  .get(authenticateToken, getOneCompany)
  .delete(authenticateToken, deleteCompany);

export { router };
