import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import 'dotenv/config'
import initAdminUser from '../utils/adminUser.handle'

let name: string | undefined
let email: string | undefined
let password: string | undefined
let role: string | undefined

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URI || 'your-mongodb-uri')
  //drop the database before initializing the test suite
  await mongoose.connection.dropCollection('users')
  const user = await initAdminUser()
  email = user?.email
  password = user?.password
  name = user?.name
  role = user?.role
})

afterAll(async () => {
  await mongoose.disconnect()
})

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error)
})

describe('User Login API', () => {
  it('should successfully log in and return status 200 when valid credentials are provided', async () => {
    const response = await request(app).post('/api/auth/login').send({ email, password })
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: expect.any(String),
      name,
      email,
      role,
    })
  })

  it('should return status 400 when login data is invalid', async () => {
    const response = await request(app).post('/api/auth/login').send({ email: '', password: '' }) // Invalid: both email and password are empty
    expect(response.status).toBe(400)
    expect(response.body).toEqual([
      { message: 'email should be a valid email', path: ['email'] },
      { message: 'password should be at least 6 characters long', path: ['password'] },
    ])
  })

  it('should return status 401 when incorrect password is provided', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email, password: 'WRONG_PASSWORD' })
    expect(response.status).toBe(401)
    expect(response.body).toEqual({ message: 'WRONG_PASSWORD' })
  })

  it('should return status 404 when logging in with a non-existent email', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'non-existing@example.com', password: 'WRONG_PASSWORD' })
    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'ACCOUNT_NOT_FOUND' })
  })

  it('should return 200 when logging out', async () => {
    const response = await request(app).get('/api/auth/logout')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'LOGGED_OUT' })
  })
})
