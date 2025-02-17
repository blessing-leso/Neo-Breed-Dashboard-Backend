import { Router } from "express";
const router = Router();
import {
    authenticateToken,
    authorizeRoles,
  } from "../controllers/authController.js";

import {registerLead, getLeads} from '../controllers/leadController.js'
router.get('/auth/leads', authenticateToken, getLeads)
router.post('/register/lead', authenticateToken,registerLead)