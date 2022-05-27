import supertest, { Response, Test } from 'supertest'
import app from '../../server'

const request: supertest.SuperTest<Test> = supertest(app)

describe('User API', () => {
  describe('endpoint /users', () => {
    it('index endpoint should unauthorized', async () => {
      const response: Response = await request.get('/users')
      expect(response.status).toBe(401)
    })
  })

  describe('endpoint /users/create', () => {
    it('for create user /users/create', async () => {
      const response: Response = await request.post('/users/create')
      expect(response.status).toBe(400)
    })

    it('for get user /users/1', async () => {
      const response: Response = await request.get('/users/1')
      expect(response.status).toBe(401)
    })

    it('for update /users/1', async () => {
      const response: Response = await request.put('/users/1')
      expect(response.status).toBe(401)
    })
  })

  describe('invalid endpoint: /user', () => {
    it('returns 404 for invalid endpoint', async () => {
      const response: Response = await request.get('/user')
      expect(response.status).toBe(404)
    })
  })
})

