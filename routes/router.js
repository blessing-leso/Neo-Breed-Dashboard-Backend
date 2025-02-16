import {Router} from 'express'
const router = Router()
import {registerEmployee, registerLead, registerClient, getAllEmployees, getLeads, getClients} from '../controllers/controller.js'
import {login, authenticateToken, authorizeRoles} from '../controllers/authController.js'

// Get requests
router.get('/auth/login', login)
router.get('/auth/employees', authenticateToken, authorizeRoles('admin'), getAllEmployees)
router.get('/auth/leads', authenticateToken, getLeads)
router.get('/auth/clients', authenticateToken, getClients)

// POST requests
router.post('/register', registerEmployee)
router.post('/register/lead', authenticateToken,registerLead)
router.post('/register/client', authenticateToken,registerClient)

export default router