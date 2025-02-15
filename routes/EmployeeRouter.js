import { Router } from "express";
const router = Router();
import { registerEmployee, updateEmployee } from "../controllers/controller.js";
import { authenticateToken, login } from "../controllers/authController.js";

router.post("/register", registerEmployee);
router.get("/auth/login", login);
router.patch("/updateEmployee", authenticateToken, updateEmployee);

export default router;
