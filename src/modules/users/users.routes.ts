import { Router } from 'express'
import { auth } from '../../middlewares/auth.middleware'
import UsersControllers from './users.controllers'
import { validate } from '../../middlewares/dataValidation'
import { registerSchema } from '../auth/auth.schemas'

const router = Router()

/**
 * [users routes]
 * http://localhost:3001/api/users [GET]
 * http://localhost:3001/api/users/:id [GET]
 */
router.use(auth())
router.get('/', UsersControllers.getUsers)
router.get('/:id', UsersControllers.getUser)
router.put('/:id', validate(registerSchema), UsersControllers.updateUser)
router.delete('/:id', UsersControllers.deleteUser)

// export the routes
export default router
