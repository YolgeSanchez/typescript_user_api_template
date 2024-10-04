import { IUser } from './auth.interfaces'
import { encrypt } from '../../utils/bcrypt.handle'
import { AppError } from '../../utils/errors'
import AuthRepository from './auth.repository'

class AuthService {
  // create user service
  createUser = async (user: IUser) => {
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
        id: insertedUser._id,
        name: insertedUser.name,
        email: insertedUser.email,
      }
      return publicUserData
    } catch (error) {
      throw new AppError('SERVER_INTERNAL_ERROR_CREATING_USER', 500)
    }
  }
}

export default new AuthService()
