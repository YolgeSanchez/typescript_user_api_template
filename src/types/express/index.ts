import { Request } from 'express'
import { IPublicUserData } from '../../modules/auth/auth.interfaces'

export interface RequestExt extends Request {
  user?: IPublicUserData
}
