import { Router } from "express";
const router = Router();
import {
    authenticateToken,
    registerLead,
    getLeads,
    authorizeRoles,
  } from "../controllers/authController.js";

router.get('/auth/leads', authenticateToken, getLeads)
router.post('/register/lead', authenticateToken,registerLead)