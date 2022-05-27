import supertest, { Response, Test } from 'supertest'
import app from '../../server'

const request: supertest.SuperTest<Test> = supertest(app)

describe('Orders API', () => {
  describe('endpoint /orders/create', () => {
    it('create orders endpoint should be unauthorized', async () => {
      const response: Response = await request.post('/orders/create')
      expect(response.status).toBe(401)
    })
    it('get user orders /orders/user should be authorized', async () => {
      const response: Response = await request.get('/orders/user')
      expect(response.status).toBe(401)
    })
    it('get user completed orders /orders/user/completed should be authorized', async () => {
      const response: Response = await request.get('/orders/user/completed')
      expect(response.status).toBe(401)
    })
  })

  describe('invalid endpoint: /orders', () => {
    it('returns 404 for invalid endpoint', async () => {
      const response: Response = await request.get('/orders')
      expect(response.status).toBe(404)
    })
  })
})
