import {Router} from 'express'
const router = Router()
import {registerEmployee} from '../controllers/controller.js'
import {login} from '../controllers/authController.js'

router.post('/register', registerEmployee)
router.get('/auth/login', login)

export default router