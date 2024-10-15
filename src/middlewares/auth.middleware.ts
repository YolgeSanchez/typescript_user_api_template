import authServices from '../modules/auth/auth.services'
import handleHttpError from '../utils/error.handle'
import { AppError } from '../types/errors'
import jwtUtils from '../utils/jwt.handle'
import { NextFunction, Response } from 'express'
import { RequestExt } from '../types/express'

// auth without roles
export const auth =
  (role: string[]) => async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const token: string = req.cookies.token
      if (!token || token.length === 0) throw new AppError('THERE_IS_NO_TOKEN', 401)

      // verify the token provided
      const payload = jwtUtils.verifyToken(token)

      // search for the user by the payload id
      const user = await authServices.getUser(payload.id)
      if (!role.includes(user.role)) throw new AppError('YOU_DONT_HAVE_THE_PERMISSION', 403)
      req.user = user
      next()
    } catch (error) {
      handleHttpError(res, error as AppError)
    }
  }
