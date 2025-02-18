import { Router } from "express";
const router = Router();
import { authenticateToken } from "../controllers/authController.js";

import {
  getLead,
  getAllLeads,
  createLead,
  updateLead,
  deleteLead,
} from "../controllers/leadController.js";
router.get("/auth/leads", authenticateToken, getAllLeads);
router.post("/register/lead", authenticateToken, createLead);
router.patch("/update/lead/:id", authenticateToken, updateLead);
router.get("/getLead/:id", authenticateToken, getLead);
router.delete("/delete/lead/:id", authenticateToken, deleteLead);

export { router };
