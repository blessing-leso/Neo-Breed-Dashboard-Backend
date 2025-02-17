import { Router } from "express";
const router = Router();
import {authenticateToken} from "../controllers/authController.js";
import {registerClient, getClients, assignClient, getClient} from '../controllers/clientController.js'

router.get('/auth/get-clients', authenticateToken, getClients)
router.post('/register/client', authenticateToken,registerClient)
router.post('/client/assign-client', authenticateToken, assignClient)
router.get('/client/get-client', authenticateToken, getClient)

export default router