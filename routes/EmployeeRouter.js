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
<<<<<<< HEAD
router.post("/forgotpassword", forgotPassword);

router.get("/auth/employees", authenticateToken, getAllEmployees);
router.get(
  "/auth/employees-details/",
  authenticateToken,
  getEmployeeWithDetails
);
router.get("/auth/logout", logout);
=======
router.get('/auth/employees', authenticateToken,authorizeRoles('Admin', 'HR', 'Manager'), getAllEmployees)
router.get('/auth/employees-details/', authenticateToken, getEmployeeWithDetails)
router.get('/auth/logout', logout)
router.get("getMe", authenticateToken, getMe);
  
// POST requests  
router.post("/register", registerEmployee);
router.post("/forgotpassword", forgotPassword);
>>>>>>> main

// PATCH requests
router.patch("/updateEmployee/:id", authenticateToken, updateEmployee);
router.patch("/resetPassword/:token", resetPassword);

// DELETE requests
router.delete("/deleteEmployee/:id", authenticateToken, deleteEmployee);
<<<<<<< HEAD
router.get("/getMe", authenticateToken, getMe);
=======
>>>>>>> main

export default router;
