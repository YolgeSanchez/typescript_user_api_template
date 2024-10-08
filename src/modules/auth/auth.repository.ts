import User from '../users/users.models'
import { IUser } from '../users/users.interfaces'

class AuthRepository {
  insertUser = (user: IUser) => new User(user).save()
  getUser = (id: string) => User.findById(id)
  getByEmail = (email: string) => User.findOne({ email })
  getByEmailAuth = (email: string) => User.findOne({ email }).select('+password')
}

export default new AuthRepository()
