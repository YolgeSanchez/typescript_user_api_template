import { Router } from 'express'
import { auth } from '../../middlewares/auth.middleware'
import UsersControllers from './users.controllers'

const router = Router()

/**
 * [users routes]
 * http://localhost:3001/api/users [GET]
 * http://localhost:3001/api/users/:id [GET]
 */
router.use(auth())
router.get('/', UsersControllers.getUsers)
router.get('/:id', UsersControllers.getUser)

// export the routes
export default router
