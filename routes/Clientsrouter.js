import { Router } from "express";
const router = Router();
import {authenticateToken} from "../controllers/authController.js";
import {registerClient, getClients} from '../controllers/clientController.js'

router.get('/auth/clients', authenticateToken, getClients)
router.post('/register/client', authenticateToken,registerClient)