import {Router} from 'express'
const router = Router()
import {registerEmployee, registerLead} from '../controllers/controller.js'
import {login, authenticateToken} from '../controllers/authController.js'

router.post('/register', registerEmployee)
router.get('/auth/login', login)
router.post('/register/lead', authenticateToken,registerLead)

export default router