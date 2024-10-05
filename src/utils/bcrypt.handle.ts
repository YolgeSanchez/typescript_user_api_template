import { hash, compare } from 'bcryptjs'

const encrypt = async (password: string) => await hash(password, 8)

const verified = async (password: string, hash: string) => await compare(password, hash)

export { encrypt, verified }
