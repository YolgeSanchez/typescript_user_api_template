import { hash, compare } from 'bcryptjs'

const encrypt = async (password: string) => await hash(password, 8)

const verified = () => {
  // TODO: implement password comparison for the login implementation
}

export { encrypt, verified }
