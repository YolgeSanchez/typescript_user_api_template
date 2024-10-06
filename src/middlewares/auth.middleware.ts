import authServices from '../modules/auth/auth.services'
import handleHttpError from '../utils/error.handle'
import { AppError } from '../utils/errors'
import jwtUtils from '../utils/jwt.handle'
import { NextFunction, Response } from 'express'
import { RequestExt } from '../types/express'

// auth without roles
export const auth = () => async (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const token: string = req.cookies.token
    if (!token || token.length === 0) throw new AppError('THERE_IS_NO_TOKEN', 401)

    // verify the token provided
    const payload = jwtUtils.verifyToken(token)

    // search for the user by the payload id
    const user = await authServices.getUser(payload.id)
    req.user = user
    next()
  } catch (error) {
    handleHttpError(res, error as AppError)
  }
}

// TODO: auth with roles
// export const auth = () => {}
