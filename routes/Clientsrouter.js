import { Router } from "express";
const router = Router();
import {
    authenticateToken,
    registerClient,
    getClients,
    authorizeRoles 
  } from "../controllers/authController.js";

  router.get('/auth/clients', authenticateToken, getClients)
  router.post('/register/client', authenticateToken,registerClient)