import { Router } from "express";
const router = Router();
import { authenticateToken } from "../controllers/authController.js";

import {
  registerLead,
  getLeads,
  getAllLeads,
  createLead,
  updateLead,
  deleteLead,
} from "../controllers/leadController.js";
router.get("/auth/leads", authenticateToken, getAllLeads);
router.post("/register/lead", authenticateToken, createLead);
router.patch("/update/lead", authenticateToken, updateLead);
router.get("/getLead/:id", authenticateToken, getLeads);
router.delete("/delete/lead", authenticateToken, deleteLead);
