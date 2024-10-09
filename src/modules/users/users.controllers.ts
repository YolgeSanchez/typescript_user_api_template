import UserServices from './users.services'
import handleHttpError from '../../utils/error.handle'
import jwtUtils from '../../utils/jwt.handle'
import { AppError } from '../../types/errors'
import { Request, Response } from 'express'
import { IUser } from './users.interfaces'

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

  // update a user
  updateUser = async (req: Request<any, any, IUser>, res: Response) => {
    try {
      const updatedUser = req.body
      const user = await UserServices.updateUser(req.params.id, updatedUser)
      res.status(200).send(user)
    } catch (error) {
      handleHttpError(res, error as AppError)
    }
  }

  // delete a user
  deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await UserServices.deleteUser(req.params.id)
      res.status(200).send(user)
    } catch (error) {
      handleHttpError(res, error as AppError)
    }
  }

  // register user
  createUser = async (req: Request<unknown, unknown, IUser>, res: Response) => {
    try {
      const registeredUser = await UserServices.createUser(req.body)
      res.status(201).send(registeredUser)
    } catch (error) {
      handleHttpError(res, error as AppError)
    }
  }
}

export default new UserController()
