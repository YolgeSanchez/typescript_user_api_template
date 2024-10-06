import { sign, verify } from 'jsonwebtoken'
import 'dotenv/config'

interface IJwtPayload {
  id: string
  name: string
  email: string
  // add more fields as needed
}

class JwtUtils {
  private readonly secret = process.env.JWT_SECRET || 'your-jwt-secret'

  generateToken = (payload: IJwtPayload): string => {
    return sign(payload, this.secret)
  }

  verifyToken = (token: string): IJwtPayload => {
    return verify(token, this.secret) as IJwtPayload
  }
}

export default new JwtUtils()
