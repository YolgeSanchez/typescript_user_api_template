import User from './auth.models'
import { IUser } from './auth.interfaces'

class AuthRepository {
  getUsers = () => User.find()
  insertUser = (user: IUser) => new User(user).save()
  getUser = (id: string) => User.findById(id)
  deleteUser = (id: string) => User.findByIdAndDelete(id)
  getByEmail = (email: string) => User.findOne({ email })
  updateUser = (id: string, updatedUser: IUser) =>
    User.findByIdAndUpdate(id, updatedUser, { new: true })
}

export default new AuthRepository()
