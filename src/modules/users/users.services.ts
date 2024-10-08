import UserRepository from './users.repository'
import { IPublicUserData } from './users.interfaces'
import { AppError } from '../../types/errors'

class UserServices {
  getUser = async (id: string): Promise<IPublicUserData> => {
    const userInDB = await UserRepository.getUser(id)
    if (!userInDB) throw new AppError('USER_NOT_FOUND', 404)

    // change this if you add more files that you want to return
    const userData = {
      id: userInDB._id.toHexString(),
      name: userInDB.name,
      email: userInDB.email,
    }
    return userData
  }

  getUsers = async (): Promise<IPublicUserData[]> => {
    const users = await UserRepository.getUsers()
    if (!users) throw new AppError('USERS_NOT_FOUND', 404)
    const usersData = users.map((user) => {
      // change this if you add more files that you want to return
      const userData = {
        id: user._id.toHexString(),
        name: user.name,
        email: user.email,
      }
      return userData
    })
    return usersData
  }
}

export default new UserServices()
