import User from '../users/users.models'

class AuthRepository {
  getUser = (id: string) => User.findById(id)
  getByEmail = (email: string) => User.findOne({ email })
  getByEmailAuth = (email: string) => User.findOne({ email }).select('+password')
}

export default new AuthRepository()
