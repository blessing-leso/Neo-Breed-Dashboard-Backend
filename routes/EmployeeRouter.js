import { Router } from "express";
const router = Router();
import {
  deleteEmployee,
  getMe,
  registerEmployee,
  updateEmployee,
} from "../controllers/controller.js";
import {
  authenticateToken,
  forgotPassword,
  login,
  resetPassword,
  registerLead,
  registerClient,
  getAllEmployees,
  getLeads,
  getClients,
  authorizeRoles,
  
} from "../controllers/authController.js";

router.post("/register", registerEmployee);
router.get("/auth/login", login);
router.post("/forgotpassword", forgotPassword);

router.get('/auth/employees', authenticateToken, authorizeRoles('admin'), getAllEmployees)
router.get('/auth/leads', authenticateToken, getLeads)
router.get('/auth/clients', authenticateToken, getClients)

router.post('/register/lead', authenticateToken,registerLead)
router.post('/register/client', authenticateToken,registerClient)

router.patch("/updateEmployee/:id", authenticateToken, updateEmployee);
router.patch("/resetPassword/:token", resetPassword);
router.delete("/deleteEmployee/:id", authenticateToken, deleteEmployee);
router.get("getMe", authenticateToken, getMe);

export default router;


