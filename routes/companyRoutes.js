import { Router } from "express";
import { authenticateToken } from "../controllers/authController";
import {
  createCompany,
  getCompanies,
  getOneCompany,
  updateCompany,
} from "../controllers/companyController";
import { deleteClient } from "../controllers/clientController";

const router = Router();

router.post("/createCompany", authenticateToken, createCompany);
router.get("/getCompanies", authenticateToken, getCompanies);
router.patch("/updateCompany", authenticateToken, updateCompany);
router.get("/getSingleCompany", authenticateToken, getOneCompany);
router.delete("/deleteCompany", authenticateToken, deleteClient);

export { router };
