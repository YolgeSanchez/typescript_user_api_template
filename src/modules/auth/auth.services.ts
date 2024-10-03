import User from './auth.models'
import { IUser } from './auth.interfaces'
import { encrypt } from '../../utils/bcrypt.handle'
import { AppError } from '../../utils/errors'

const createUser = async (user: IUser) => {
  // verify not existing user with this email
  const isEmailInUse = await getByEmail(user.email)
  if (isEmailInUse) throw new AppError('EMAIL_ALREADY_IN_USE', 409)

  // hashed password
  const password = await encrypt(user.password)

  // create the user and save it
  try {
    const insertedUser = await insertUser({ ...user, password })
    return insertedUser
  } catch (error) {
    throw new AppError('SERVER_INTERNAL_ERROR_CREATING_USER', 500)
  }
}

// repetitive database queries operations
const getUsers = () => User.find()
const insertUser = (user: IUser) => new User(user).save()
const getUser = (id: string) => User.findById(id)
const deleteUser = (id: string) => User.findByIdAndDelete(id)
const getByEmail = (email: string) => User.findOne({ email })
const updateUser = (id: string, updatedUser: IUser) =>
  User.findByIdAndUpdate(id, updatedUser, { new: true })

//exports
export { createUser }
