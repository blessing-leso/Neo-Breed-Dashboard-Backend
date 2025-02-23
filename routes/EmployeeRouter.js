import { Router } from "express";
const router = Router({ mergeParams: true });
import {
  deleteEmployee,
  getMe,
  registerEmployee,
  updateEmployee,
  forgotPassword,
  getAllEmployees,
  resetPassword,
  setCompanyId,
  getEmployee,
} from "../controllers/EmployeeController.js";
import {
  authenticateToken,
  login,
  authorizeRoles,
  logout,
} from "../controllers/authController.js";

// GET requests
router.get("/login", login);
router.get(
  "/auth/employees",
  authenticateToken,
  authorizeRoles("Admin", "HR", "Manager"),
  getAllEmployees
);
router.get("/auth/employees-details/:id", authenticateToken, getEmployee);
router.get("/auth/logout", logout);
router.get("getMe", authenticateToken, getMe);

// POST requests
router.post("/", authenticateToken, setCompanyId, registerEmployee);
router.post("/", forgotPassword);

// PATCH requests
router.patch("/:id", authenticateToken, updateEmployee);
router.patch("/:token", resetPassword);

// DELETE requests
router.delete("/:id", authenticateToken, deleteEmployee);

export { router };
