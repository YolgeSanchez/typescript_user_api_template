import { Router } from 'express'
import { registerController } from './auth.controllers'

const router = Router()

//auth routes

/**
 * http://localhost:3001/api/auth/register [POST]
 */
router.post('/register', registerController)

export default router
