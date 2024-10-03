import { Router } from 'express'
import { registerController } from './auth.controllers'
import { validate } from '../../middlewares/dataValidation'
import { registerSchema } from './auth.schemas'

const router = Router()

/**
 * authentication routes
 * http://localhost:3001/api/auth/register [POST]
 */
router.post('/register', validate(registerSchema), registerController)

export default router
