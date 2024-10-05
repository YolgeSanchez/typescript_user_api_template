import { Router } from 'express'
import { validate } from '../../middlewares/dataValidation'
import { authSchema, registerSchema } from './auth.schemas'
import AuthController from './auth.controllers'

const router = Router()

/**
 * [authentication routes]
 * http://localhost:3001/api/auth/register [POST]
 * http://localhost:3001/api/auth/login [POST]
 */
router.post('/register', validate(registerSchema), AuthController.register)
router.post('/login', validate(authSchema), AuthController.login)

export default router
