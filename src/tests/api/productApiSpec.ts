import supertest, { Response, Test } from 'supertest'
import app from '../../server'

const request: supertest.SuperTest<Test> = supertest(app)

describe('Product API', () => {
  describe('endpoint /products', () => {
    it('index endpoint should return all products', async () => {
      const response: Response = await request.get('/products')
      expect(response.status).toBe(200)
    })
  })

  describe('endpoint /products/create', () => {
    it('for create product /products/create unauthorized', async () => {
      const response: Response = await request.post('/products/create')
      expect(response.status).toBe(401)
    })

    it('for get product /products/1', async () => {
      const response: Response = await request.get('/products/1')
      expect(response.status).toBe(200)
    })

    it('for update /products/1 unauthorized', async () => {
      const response: Response = await request.put('/products/1')
      expect(response.status).toBe(401)
    })

    it('for delete /products/1 unauthorized', async () => {
      const response: Response = await request.put('/products/1')
      expect(response.status).toBe(401)
    })
  })

  describe('invalid endpoint: /product', () => {
    it('returns 404 for invalid endpoint', async () => {
      const response: Response = await request.get('/product')
      expect(response.status).toBe(404)
    })
  })
})
