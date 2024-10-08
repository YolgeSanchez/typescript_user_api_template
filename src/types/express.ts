import { Request } from 'express'
import { IPublicUserData } from '../modules/users/users.interfaces'

export interface RequestExt extends Request {
  user?: IPublicUserData
}
