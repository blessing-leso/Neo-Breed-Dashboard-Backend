import { Router } from "express";
const router = Router();
import {
  deleteEmployee,
  getAllEmployees,
  getEmployee,
  getMe,
  registerEmployee,
  updateEmployee,
} from "../controllers/controller.js";
import {
  authenticateToken,
  forgotPassword,
  login,
} from "../controllers/authController.js";

router.post("/register", registerEmployee);
router.get("/auth/login", login);
router.post("/forgotpassword", forgotPassword);
router.get("/getAllEmployees", authenticateToken, getAllEmployees);

router.get("/getEmployee/:id", authenticateToken, getEmployee);
router.patch("/updateEmployee/:id", authenticateToken, updateEmployee);
router.delete("/deleteEmployee/:id", authenticateToken, deleteEmployee);
router.get("getMe", authenticateToken, getMe);

export default router;
