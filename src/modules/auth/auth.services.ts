import { IPublicAuthData, IAuth } from './auth.interfaces'
import { verified } from '../../utils/bcrypt.handle'
import { AppError } from '../../types/errors'
import AuthRepository from './auth.repository'

class AuthService {
  authUser = async (user: IAuth): Promise<IPublicAuthData> => {
    // verify user with this email exists
    const userInDB = await AuthRepository.getByEmailAuth(user.email)
    if (!userInDB) throw new AppError('ACCOUNT_NOT_FOUND', 404)

    // verify password provided
    const hash = userInDB.password
    const isPasswordCorrect = await verified(user.password, hash)
    if (!isPasswordCorrect) throw new AppError('WRONG_PASSWORD', 401)

    // change this if you add more files that you want to return
    const publicUserData = {
      id: userInDB._id.toHexString(),
      name: userInDB.name,
      email: userInDB.email,
      role: userInDB.role,
    }
    return publicUserData
  }

  getUser = async (id: string): Promise<IPublicAuthData> => {
    const userInDB = await AuthRepository.getUser(id)
    if (!userInDB) throw new AppError('USER_NOT_FOUND', 404)

    // change this if you add more files that you want to return
    const userData = {
      id: userInDB._id.toHexString(),
      name: userInDB.name,
      email: userInDB.email,
      role: userInDB.role,
    }
    return userData
  }
}

export default new AuthService()
