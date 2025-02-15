import {Router} from 'express'
const router = Router()
import {registerEmployee, registerLead, registerClient, getEmployees} from '../controllers/controller.js'
import {login, authenticateToken, authorizeRoles} from '../controllers/authController.js'

router.post('/register', registerEmployee)
router.get('/auth/login', login)
router.get('/auth/employees', authenticateToken, authorizeRoles('admin'), getEmployees)
router.post('/register/lead', authenticateToken,registerLead)
router.post('/register/client', authenticateToken,registerClient)

export default router