import { IAuth, IPublicUserData, IUser } from './auth.interfaces'
import { encrypt, verified } from '../../utils/bcrypt.handle'
import { AppError } from '../../utils/errors'
import AuthRepository from './auth.repository'

class AuthService {
  // create user service
  createUser = async (user: IUser): Promise<IPublicUserData> => {
    // verify not existing user with this email
    const isEmailInUse = await AuthRepository.getByEmail(user.email)
    if (isEmailInUse) throw new AppError('EMAIL_ALREADY_IN_USE', 409)

    // hashed password
    const password = await encrypt(user.password)

    // create the user and save it
    try {
      const insertedUser = await AuthRepository.insertUser({ ...user, password })
      // change this if you add more files that you want to return
      const publicUserData = {
        id: insertedUser._id.toHexString(),
        name: insertedUser.name,
        email: insertedUser.email,
      }
      return publicUserData
    } catch (error) {
      throw new AppError('SERVER_INTERNAL_ERROR_CREATING_USER', 500)
    }
  }

  authUser = async (user: IAuth): Promise<IPublicUserData> => {
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
    }
    return publicUserData
  }

  getUser = async (id: string): Promise<IPublicUserData> => {
    const userInDB = await AuthRepository.getUser(id)
    if (!userInDB) throw new AppError('USER_NOT_FOUND', 404)

    // change this if you add more files that you want to return
    const userData = {
      id: userInDB._id.toHexString(),
      name: userInDB.name,
      email: userInDB.email,
    }
    return userData
  }
}

export default new AuthService()
