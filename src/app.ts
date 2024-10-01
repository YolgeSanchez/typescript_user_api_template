import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import db from './config/mongo'
import authRoutes from './modules/auth/auth.routes'

// change this to the port you want to use
const PORT = process.env.PORT || 3000
const app = express()

// apply the cors setting you want
app.use(cors())
app.use(express.json())

// routes
app.use('/api/auth', authRoutes)
// add all the other routes for your api

// run the server
db().then(() => {
  console.log('>>> Connected to MongoDB database')
  app.listen(PORT, () => console.log(`>>> Running on port ${PORT}`))
})
