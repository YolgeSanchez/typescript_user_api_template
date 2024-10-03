import { Request, Response } from 'express'
import { createUser } from './auth.services'
import { IUser } from './auth.interfaces'
import handleHttpError from '../../utils/error.handle'
import { AppError } from '../../utils/errors'

const registerController = async (req: Request<unknown, unknown, IUser>, res: Response) => {
  try {
    const registeredUser = await createUser(req.body)
    res.status(201).send(registeredUser)
  } catch (error) {
    handleHttpError(res, error as AppError)
  }
}

//exports
export { registerController }
