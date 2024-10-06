export interface IUser {
  name: string
  email: string
  password: string
  // replace or add any field you want for your user model interface
}

export interface IAuth {
  email: string
  password: string
  // replace or add any field you want for your authentication interface
}

export interface IPublicUserData {
  id: string
  name: string
  email: string
}
