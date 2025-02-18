import { Router } from "express";
const router = Router();
import {
  deleteEmployee,
  getMe,
  registerEmployee,
  updateEmployee,
  forgotPassword,
  getAllEmployees,
  resetPassword,
  getEmployeeWithDetails
} from "../controllers/EmployeeController.js";
import {
  authenticateToken,
  login,
  authorizeRoles,
  logout
  } from "../controllers/authController.js";

router.post("/register", registerEmployee);
router.get("/auth/login", login);
router.post("/forgotpassword", forgotPassword);

router.get('/auth/employees', authenticateToken, getAllEmployees)
router.get('/auth/employees-details/', authenticateToken, getEmployeeWithDetails)
router.get('/auth/logout', logout)

router.patch("/updateEmployee/:id", authenticateToken, updateEmployee);
router.patch("/resetPassword/:token", resetPassword);
router.delete("/deleteEmployee/:id", authenticateToken, deleteEmployee);
router.get("getMe", authenticateToken, getMe);

export default router;


