export interface IPublicUserData {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  // replace or add any field you want for your public user data
}

export interface IUser {
  name: string
  email: string
  password: string
  role: 'user' | 'admin'
  // replace or add any field you want for your user model interface
}
