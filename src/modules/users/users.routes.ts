import { Router } from 'express'
import { auth } from '../../middlewares/auth.middleware'
import UsersControllers from './users.controllers'
import { validate } from '../../middlewares/dataValidation'
import { registerSchema } from './users.schemas'

const router = Router()

/**
 * [users routes]
 * http://localhost:3001/api/users [GET] [admin & user]
 * http://localhost:3001/api/users/:id [GET] [admin & user]
 * http://localhost:3001/api/users/:id [PUT] [admin only]
 * http://localhost:3001/api/users/:id [DELETE] [admin only]
 * http://localhost:3001/api/users [POST] [admin only]
 */
router.get('/', auth(['admin', 'user']), UsersControllers.getUsers)
router.get('/:id', auth(['admin', 'user']), UsersControllers.getUser)
router.put('/:id', auth(['admin']), validate(registerSchema), UsersControllers.updateUser)
router.delete('/:id', auth(['admin']), UsersControllers.deleteUser)
router.post('/', auth(['admin']), validate(registerSchema), UsersControllers.createUser)

// export the routes
export default router
