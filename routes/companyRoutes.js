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

router.post("/createCompany", authenticateToken, createCompany);
router.get("/getCompanies", authenticateToken, getCompanies);
router.patch("/updateCompany/:id", authenticateToken, updateCompany);
router.get("/getSingleCompany/:id", authenticateToken, getOneCompany);
router.delete("/deleteCompany/:id", authenticateToken, deleteCompany);

export { router };
