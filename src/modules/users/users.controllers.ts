import UserServices from './users.services'
import handleHttpError from '../../utils/error.handle'
import { AppError } from '../../types/errors'
import { Request, Response } from 'express'

class UserController {
  // get all users
  getUsers = async (_: Request, res: Response) => {
    try {
      const users = await UserServices.getUsers()
      res.status(200).send(users)
    } catch (error) {
      handleHttpError(res, error as AppError)
    }
  }

  // get a user
  getUser = async (req: Request, res: Response) => {
    try {
      const user = await UserServices.getUser(req.params.id)
      res.status(200).send(user)
    } catch (error) {
      handleHttpError(res, error as AppError)
    }
  }
}

export default new UserController()
