import { Router } from "express";
const router = Router();
import {
  deleteEmployee,
  getAllEmployees,
  registerEmployee,
  updateEmployee,
} from "../controllers/controller.js";
import { authenticateToken, login } from "../controllers/authController.js";

router.post("/register", registerEmployee);
router.get("/auth/login", login);
router.get("/getAllEmployees", authenticateToken, getAllEmployees);
router.patch("/updateEmployee/:id", authenticateToken, updateEmployee);
router.delete("/deleteEmployee", authenticateToken, deleteEmployee);
export default router;
