import { Request, Response } from 'express'
import { IAuth } from './auth.interfaces'
import { IUser } from '../users/users.interfaces'
import handleHttpError from '../../utils/error.handle'
import { AppError } from '../../types/errors'
import AuthService from './auth.services'
import jwtUtils from '../../utils/jwt.handle'

class AuthController {
  // register user
  register = async (req: Request<unknown, unknown, IUser>, res: Response) => {
    try {
      const registeredUser = await AuthService.createUser(req.body)
      res.cookie('token', jwtUtils.generateToken(registeredUser))
      res.status(201).send(registeredUser)
    } catch (error) {
      handleHttpError(res, error as AppError)
    }
  }

  // authenticate user
  login = async (req: Request<unknown, unknown, IAuth>, res: Response) => {
    try {
      const authenticatedUser = await AuthService.authUser(req.body)
      res.cookie('token', jwtUtils.generateToken(authenticatedUser))
      res.status(200).send(authenticatedUser)
    } catch (error) {
      handleHttpError(res, error as AppError)
    }
  }

  // logout user
  logout = (_: Request, res: Response) => {
    res.clearCookie('token')
    res.status(200).send('Logged out')
  }
}

//exports
export default new AuthController()
