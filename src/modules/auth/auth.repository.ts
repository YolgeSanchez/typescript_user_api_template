import User from './auth.models'
import { IUser } from './auth.interfaces'

class AuthRepository {
  getUsers = () => User.find()
  insertUser = (user: IUser) => new User(user).save()
  getUser = (id: string) => User.findById(id)
  deleteUser = (id: string) => User.findByIdAndDelete(id)
  getByEmail = (email: string) => User.findOne({ email })
  getByEmailAuth = (email: string) => User.findOne({ email }).select('+password')
  updateUser = (id: string, updatedUser: IUser) =>
    User.findByIdAndUpdate(id, updatedUser, { new: true })
}

export default new AuthRepository()
