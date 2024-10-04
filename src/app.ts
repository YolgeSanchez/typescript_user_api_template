import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from './modules/auth/auth.routes'

const app = express()

// [middlewares]
// apply the cors setting you want
app.use(cors())
app.use(express.json())

// [routes]
app.use('/api/auth', authRoutes)
// add all the other routes for your api

// export the express app
export default app
