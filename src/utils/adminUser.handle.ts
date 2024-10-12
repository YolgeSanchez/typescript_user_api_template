import UserRepository from '../modules/users/users.repository'
import { IUser } from '../modules/users/users.interfaces'
import { encrypt } from './bcrypt.handle'

interface IAdminUser {
  name: string
  email: string
  password: string
  role: string
}

const initAdminUser = async (): Promise<IAdminUser | undefined> => {
  try {
    const users = await UserRepository.getUsers()
    let adminExists = false
    if (users) {
      users.filter((user) => user.role === 'admin').length > 0
        ? (adminExists = true)
        : (adminExists = false)
    }
    if (!adminExists) {
      console.log('No admin found, creating one...')

      const defaultAdmin: IUser = {
        name: 'Admin',
        email: 'admin@admin.com',
        password: await encrypt('admin1234'), // Default password, make sure to encrypt it
        role: 'admin',
      }

      await UserRepository.insertUser(defaultAdmin)
      console.log('Admin user created successfully.')
      return {
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin1234',
        role: 'admin',
      }
    }
    console.log('Admin user already exists.')
    console.log(users[0])
    return {
      name: users[0].name,
      email: users[0].email,
      password: 'admin1234',
      role: users[0].role,
    }
  } catch (error) {
    console.error('Error initializing admin user:', error)
  }
}

export default initAdminUser
