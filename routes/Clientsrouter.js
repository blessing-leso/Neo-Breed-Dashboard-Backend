import { Router } from "express";
const router = Router();
import {authenticateToken, authorizeRoles} from "../controllers/authController.js";
import{
registerClient, 
getClients, 
assignClient, 
getClient, 
unassignClient, 
deleteClient,
updateClientDetails,
updateClientStatus,
addAmountPaid
} from '../controllers/clientController.js'

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
router.patch('/client/update-client-details', authenticateToken, authorizeRoles('Admin', 'HR', 'Manager'), updateClientDetails)
router.patch('/client/update-client-status', authenticateToken, authorizeRoles('Admin', 'HR', 'Manager'), updateClientStatus)
router.patch('/client/add-amount-paid', authenticateToken, authorizeRoles('Admin', 'HR', 'Manager'), addAmountPaid)

export default router