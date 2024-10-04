import { Request, Response } from 'express'
import { IUser } from './auth.interfaces'
import handleHttpError from '../../utils/error.handle'
import { AppError } from '../../utils/errors'
import AuthService from './auth.services'

const registerController = async (req: Request<unknown, unknown, IUser>, res: Response) => {
  try {
    const registeredUser = await AuthService.createUser(req.body)
    res.status(201).send(registeredUser)
  } catch (error) {
    handleHttpError(res, error as AppError)
  }
}

//exports
export { registerController }
