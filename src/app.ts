import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './modules/auth/auth.routes'
import userRoutes from './modules/users/users.routes'

const app = express()

// [middlewares]
// apply the cors setting you want
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// [routes]
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
// add all the other routes for your api

// export the express app
export default app
