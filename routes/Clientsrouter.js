import { Router } from "express";
const router = Router();
import {authenticateToken, authorizeRoles} from "../controllers/authController.js";
import {registerClient, getClients, assignClient, getClient, unassignClient, deleteClient} from '../controllers/clientController.js'

// GET requests
router.get('/client/get-clients', authenticateToken, getClients)
router.get('/client/get-client', authenticateToken, getClient)

// POST requests
router.post('/register/client', authenticateToken,registerClient)
router.post('/client/assign-client', authenticateToken, authorizeRoles('Admin', 'HR', 'Manager') , assignClient)

// DELETE requests
router.delete('/client/delete-client', authenticateToken, authorizeRoles('Admin', 'HR', 'Manager'), deleteClient)

// PATCH requests
router.patch('/client/unassign-client', authenticateToken, authorizeRoles('Admin', 'HR', 'Manager'), unassignClient)

export default router