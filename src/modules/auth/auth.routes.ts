import { Router } from 'express'
import { validate } from '../../middlewares/dataValidation'
import { authSchema, registerSchema } from './auth.schemas'
import AuthController from './auth.controllers'
import { auth } from '../../middlewares/auth.middleware'
import { RequestExt } from '../../types/express'

const router = Router()

/**
 * [authentication routes]
 * http://localhost:3001/api/auth/register [POST]
 * http://localhost:3001/api/auth/login [POST]
 */
router.post('/register', validate(registerSchema), AuthController.register)
router.post('/login', validate(authSchema), AuthController.login)
router.use(auth())
router.get('/protected', (req: RequestExt, res) => {
  res.send({ message: 'solo un usuario autenticado lo puede ver', user: req.user })
})

export default router
