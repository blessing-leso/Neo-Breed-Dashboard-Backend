import { Router } from "express";
import {
  createCall,
  deleteCall,
  getAllCalls,
  getCall,
  setClientandEmployeeId,
} from "../controllers/callController.js";
import { authenticateToken } from "../controllers/authController.js";

const router = Router({ mergeParams: true });

router.get("/", authenticateToken, getAllCalls);
router.post("/", authenticateToken, setClientandEmployeeId, createCall);
router.get("/:id", authenticateToken, getCall);
router.delete("/:id", authenticateToken, deleteCall);

export default router;
