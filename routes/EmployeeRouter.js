import { Router } from "express";
const router = Router();
import {
  deleteEmployee,
  getAllEmployees,
  getMe,
  registerEmployee,
  updateEmployee,
} from "../controllers/controller.js";
import { authenticateToken, login } from "../controllers/authController.js";

router.post("/register", registerEmployee);
router.get("/auth/login", login);
router.get("/getAllEmployees", authenticateToken, getAllEmployees);


router.patch("/updateEmployee/:id", authenticateToken, updateEmployee);
router.delete("/deleteEmployee/:id", authenticateToken, deleteEmployee);
router.get("getMe", authenticateToken, getMe);
export default router;
