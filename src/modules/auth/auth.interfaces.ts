export interface IAuth {
  email: string
  password: string
  // replace or add any field you want for your authentication interface
}
export interface IPublicAuthData {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  // replace or add any field you want for your public user data
}
