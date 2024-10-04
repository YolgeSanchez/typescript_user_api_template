import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import 'dotenv/config'

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URI || 'your-mongodb-uri')
})

afterAll(async () => {
  await mongoose.disconnect()
})

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error)
})

// api authentication suites
describe('register api end-points testing', () => {
  it('should return 201 for POST /api/auth/login with valid data', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ name: 'testing', email: 'test2@example.com', password: 'example' })
    expect(response.status).toBe(201)
  })

  it('should return 400 for POST /api/auth/login with invalid data', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ name: 't', password: 't', email: 't' })
    expect(response.status).toBe(400)
  })
})
