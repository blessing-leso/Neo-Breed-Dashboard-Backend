import { Router } from "express";
const router = Router({ mergeParams: true });
import { authenticateToken } from "../controllers/authController.js";

import {
  getLead,
  getAllLeads,
  createLead,
  updateLead,
  deleteLead,
} from "../controllers/leadController.js";
import { setCompanyId } from "../controllers/EmployeeController.js";
router.get("/auth/leads", authenticateToken, getAllLeads);
router.post("/", authenticateToken, setCompanyId, createLead);
router.patch("/update/lead/:id", authenticateToken, updateLead);
router.get("/getLead/:id", authenticateToken, getLead);
router.delete("/delete/lead/:id", authenticateToken, deleteLead);

export default router;
