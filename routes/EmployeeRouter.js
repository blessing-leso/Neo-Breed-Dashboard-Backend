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
  getEmployeeWithDetails,
} from "../controllers/EmployeeController.js";
import {
  authenticateToken,
  login,
  authorizeRoles,
  logout,
} from "../controllers/authController.js";

// GET requests
router.get("/auth/login", login);
router.get("/auth/employees", authenticateToken, authorizeRoles("Admin", "HR", "Manager"),getAllEmployees);
router.get("/auth/employees-details/",authenticateToken, getEmployeeWithDetails);
router.get("/auth/logout", logout);
router.get("getMe", authenticateToken, getMe);

// POST requests
router.post("/register", registerEmployee);
router.post("/forgotpassword", forgotPassword);

// PATCH requests
router.patch("/updateEmployee/:id", authenticateToken, updateEmployee);
router.patch("/resetPassword/:token", resetPassword);

// DELETE requests
router.delete("/deleteEmployee/:id", authenticateToken, authorizeRoles('HR'), deleteEmployee);

export default router;
