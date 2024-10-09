import UserRepository from './users.repository'
import { IPublicUserData, IUser } from './users.interfaces'
import { AppError } from '../../types/errors'
import { encrypt } from '../../utils/bcrypt.handle'

class UserServices {
  getUser = async (id: string): Promise<IPublicUserData> => {
    try {
      const userInDB = await UserRepository.getUser(id)
      if (!userInDB) throw new AppError('USER_NOT_FOUND', 404)
      // change this if you add more files that you want to return
      const userData = {
        id: userInDB._id.toHexString(),
        name: userInDB.name,
        email: userInDB.email,
        role: userInDB.role,
      }
      return userData
    } catch (error) {
      throw new AppError('USER_NOT_FOUND', 404)
    }
  }

  getUsers = async (): Promise<IPublicUserData[]> => {
    const users = await UserRepository.getUsers()
    if (!users) throw new AppError('USERS_NOT_FOUND', 404)
    // create a new array with the user data interface structure
    const usersData = users.map((user) => {
      // change this if you add more files that you want to return
      const userData = {
        id: user._id.toHexString(),
        name: user.name,
        email: user.email,
        role: user.role,
      }
      return userData
    })
    return usersData
  }

  updateUser = async (id: string, updatedUser: IUser): Promise<IPublicUserData> => {
    try {
      const user = await UserRepository.updateUser(id, updatedUser)
      if (!user) {
        throw new AppError('USER_NOT_FOUND', 404)
      }
      const publicUserData = {
        id: user._id.toHexString(),
        name: user.name,
        email: user.email,
        role: user.role,
      }
      return publicUserData
    } catch (error) {
      throw new AppError('USER_NOT_FOUND', 404)
    }
  }

  deleteUser = async (id: string): Promise<IPublicUserData> => {
    try {
      const user = await UserRepository.deleteUser(id)
      if (!user) {
        throw new AppError('USER_NOT_FOUND', 404)
      }
      const publicUserData = {
        id: user._id.toHexString(),
        name: user.name,
        email: user.email,
        role: user.role,
      }
      return publicUserData
    } catch (error) {
      throw new AppError('USER_NOT_FOUND', 404)
    }
  }

  // create user service
  createUser = async (user: IUser): Promise<IPublicUserData> => {
    // verify not existing user with this email
    const isEmailInUse = await UserRepository.getByEmail(user.email)
    if (isEmailInUse) throw new AppError('EMAIL_ALREADY_IN_USE', 409)

    // hashed password
    const password = await encrypt(user.password)

    // create the user and save it
    try {
      const insertedUser = await UserRepository.insertUser({ ...user, password })
      // change this if you add more files that you want to return
      const publicUserData = {
        id: insertedUser._id.toHexString(),
        name: insertedUser.name,
        email: insertedUser.email,
        role: insertedUser.role,
      }
      return publicUserData
    } catch (error) {
      throw new AppError('SERVER_INTERNAL_ERROR_CREATING_USER', 500)
    }
  }
}

export default new UserServices()
