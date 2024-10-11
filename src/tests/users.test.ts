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
  await mongoose.connection.dropCollection('users')
  const user = await initAdminUser()
  name = user?.name
  email = user?.email
  password = user?.password
  role = user?.role
  //drop the database before initializing the test suite
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
  let notAuthorizedToken: string
  it('should return 200 when logging in with admin credentials', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email,
      password,
    })
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: expect.any(String),
      name,
      email,
      role,
    })
    token = response.headers['set-cookie'][0].split(';')[0]
  })

  it('should return status 201 when creating a new user', async () => {
    const response = await request(app).post('/api/users').set('Cookie', token).send({
      name: 'jane doe',
      email: 'janedoe@example.com',
      password: 'example',
      role: 'user',
    })
    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'jane doe',
      email: 'janedoe@example.com',
      role: 'user',
    })
    const login = await request(app).post('/api/auth/login').send({
      email: 'janedoe@example.com',
      password: 'example',
    })
    id = response.body.id
    notAuthorizedToken = login.headers['set-cookie'][0].split(';')[0]
  })

  it('should return status 409 when attempting to create a user with an existing email', async () => {
    const response = await request(app).post('/api/users').set('Cookie', token).send({
      name: 'jane doe',
      email: 'janedoe@example.com',
      password: 'example',
      role: 'user',
    })
    expect(response.status).toBe(409)
    expect(response.body).toEqual({ message: 'EMAIL_ALREADY_IN_USE' })
  })

  it('should return status 200 when retrieving all users with token', async () => {
    const response = await request(app).get('/api/users').set('Cookie', token)
    expect(response.status).toBe(200)
    expect(response.body).toEqual([
      {
        id: expect.any(String),
        name,
        email,
        role,
      },
      {
        id: expect.any(String),
        name: 'jane doe',
        email: 'janedoe@example.com',
        role: 'user',
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
      role: 'user',
    })
  })

  it('should return status 404 when retrieving a user that does not exist but with token', async () => {
    const response = await request(app)
      .get('/api/users/61e8e7c1e1d3c9e5a4b12345')
      .set('Cookie', token)
    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'USER_NOT_FOUND' })
  })

  it('should return status 403 when updating a user with a not authorized token', async () => {
    const response = await request(app)
      .put(`/api/users/${id}`)
      .set('Cookie', notAuthorizedToken)
      .send({
        name: 'new jane doe',
        email: 'newjanedoe@example.com',
        password: 'example',
        role: 'user',
      })
    expect(response.status).toBe(403)
    expect(response.body).toEqual({ message: 'YOU_DONT_HAVE_THE_PERMISSION' })
  })

  it('should return status 200 when updating a user with token', async () => {
    const response = await request(app).put(`/api/users/${id}`).set('Cookie', token).send({
      name: 'new jane doe',
      email: 'newjanedoe@example.com',
      password: 'example',
      role: 'admin',
    })
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id,
      name: 'new jane doe',
      email: 'newjanedoe@example.com',
      role: 'admin',
    })

    // return this user role to 'user'
    await request(app).put(`/api/users/${id}`).set('Cookie', token).send({
      name: 'new jane doe',
      email: 'newjanedoe@example.com',
      password: 'example',
      role: 'user',
    })
  })

  it('should return status 403 when deleting a user with a not authorized token', async () => {
    const response = await request(app).delete(`/api/users/${id}`).set('Cookie', notAuthorizedToken)
    expect(response.status).toBe(403)
    expect(response.body).toEqual({ message: 'YOU_DONT_HAVE_THE_PERMISSION' })
  })

  it('should return status 200 when deleting a user with token', async () => {
    const response = await request(app).delete(`/api/users/${id}`).set('Cookie', token)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id,
      name: 'new jane doe',
      email: 'newjanedoe@example.com',
      role: 'user',
    })

    await request(app).get('/api/auth/logout')
  })
})
