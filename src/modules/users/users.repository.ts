import { IUser } from './users.interfaces'
import User from './users.models'

class UserRepository {
  insertUser = (user: IUser) => new User(user).save()
  getUsers = () => User.find()
  getUser = (id: string) => User.findById(id)
  deleteUser = (id: string) => User.findByIdAndDelete(id)
  getByEmail = (email: string) => User.findOne({ email })
  updateUser = (id: string, updatedUser: IUser) =>
    User.findByIdAndUpdate(id, updatedUser, { new: true })
}

export default new UserRepository()
