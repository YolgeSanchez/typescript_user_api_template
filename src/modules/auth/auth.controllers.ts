import { Request, Response } from 'express'
import { IAuth } from './auth.interfaces'
import { IUser } from '../users/users.interfaces'
import handleHttpError from '../../utils/error.handle'
import { AppError } from '../../types/errors'
import AuthService from './auth.services'
import jwtUtils from '../../utils/jwt.handle'

class AuthController {
  // authenticate user
  login = async (req: Request<unknown, unknown, IAuth>, res: Response) => {
    try {
      const authenticatedUser = await AuthService.authUser(req.body)
      const token = jwtUtils.generateToken(authenticatedUser)
      console.log(token)
      res.cookie('token', token)
      res.status(200).send(authenticatedUser)
    } catch (error) {
      handleHttpError(res, error as AppError)
    }
  }

  // logout user
  logout = (_: Request, res: Response) => {
    res.clearCookie('token')
    res.status(200).send({ message: 'LOGGED_OUT' })
  }
}

//exports
export default new AuthController()
