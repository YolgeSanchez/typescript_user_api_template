import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import 'dotenv/config'
import authServices from '../modules/auth/auth.services'

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URI || 'your-mongodb-uri')
  //drop the database before initializing the test suite
  await mongoose.connection.dropDatabase()
})

afterAll(async () => {
  await mongoose.disconnect()
})

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error)
})

describe('User API', () => {
  it('should return status 401 when retrieving all users without token', async () => {
    const response = await request(app).get('/api/users')
    expect(response.status).toBe(401)
    expect(response.body).toEqual({ message: 'THERE_IS_NO_TOKEN' })
  })

  // create users for testing
  let id: string
  let token: string
  it('should create a new user and return status 201 when valid registration data is provided', async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'jane doe',
      email: 'janedoe@example.com',
      password: 'example',
    })
    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'jane doe',
      email: 'janedoe@example.com',
    })
    id = response.body.id
    token = response.headers['set-cookie'][0].split(';')[0]
  })

  it('should return status 200 when retrieving all users with token', async () => {
    const response = await request(app).get('/api/users').set('Cookie', token)
    expect(response.status).toBe(200)
    expect(response.body).toEqual([
      {
        id: expect.any(String),
        name: 'john doe',
        email: 'johndoe@example.com',
      },
      {
        id: expect.any(String),
        name: 'jane doe',
        email: 'janedoe@example.com',
      },
    ])
  })

  it('should return status 200 when retrieving a user by id with token', async () => {
    const response = await request(app).get(`/api/users/${id}`).set('Cookie', token)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'jane doe',
      email: 'janedoe@example.com',
    })
  })

  it('should return status 404 when retrieving a user that does not exist but with token', async () => {
    const response = await request(app)
      .get('/api/users/61e8e7c1e1d3c9e5a4b12345')
      .set('Cookie', token)
    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'USER_NOT_FOUND' })
  })

  it('should return status 200 when updating a user with token', async () => {
    const response = await request(app).put(`/api/users/${id}`).set('Cookie', token).send({
      name: 'new jane doe',
      email: 'newjanedoe@example.com',
      password: 'example',
    })
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id,
      name: 'new jane doe',
      email: 'newjanedoe@example.com',
    })
  })

  it('should return status 200 when deleting a user with token', async () => {
    const response = await request(app).delete(`/api/users/${id}`).set('Cookie', token)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id,
      name: 'new jane doe',
      email: 'newjanedoe@example.com',
    })
  })
})
