import { Request, Response } from 'express'
import { createUser } from './auth.services'
import { IAuth } from './auth.interfaces'
import handleHttpError from '../../utils/error.handle'
import { AppError } from '../../utils/errors'

const registerController = async (req: Request<{}, {}, IAuth>, res: Response) => {
  try {
    const response = await createUser(req.body)
    res.status(201).send(response)
  } catch (error) {
    handleHttpError(res, error as AppError)
  }
}

//exports
export { registerController }
