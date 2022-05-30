import { Product, product } from '../../models/product'

const testProduct = new Product()

describe('Product Model creating product', () => {
  it('create method should add a product', async () => {
    const result: product = await testProduct.create({
      name: 'Test Product',
      price: 10,
      category: 'Test Category',
    })
    if (result) {
      expect(result.name).toBe('Test Product')
      expect(result.price).toBe(10)
      expect(result.category).toBe('Test Category')
    }
  })
})

describe('Product Model', () => {
  it('index method should be defined', () => {
    expect(testProduct.index).toBeDefined()
  })
  it('show method should be defined', () => {
    expect(testProduct.show).toBeDefined()
  })
  it('showByCategory method should be defined', () => {
    expect(testProduct.showByCategory).toBeDefined()
  })
  it('create method should be defined', () => {
    expect(testProduct.create).toBeDefined()
  })
  it('update method should be defined', () => {
    expect(testProduct.update).toBeDefined()
  })
  it('delete method should be defined', () => {
    expect(testProduct.delete).toBeDefined()
  })

  it('index method should return a list of products', async () => {
    const result: product[] = await testProduct.index()
    expect(result.length).not.toEqual(0)
  })

  it('show method should return the correct product', async () => {
    const result: product = await testProduct.show(1)
    if (result) {
      expect(result.name).toBe('Test Product')
      expect(result.price).toBe(10)
      expect(result.category).toBe('Test Category')
    }
  })

  it('showByCategory method should return the correct product', async () => {
    const result: product[] = await testProduct.showByCategory('Test Category')
    expect(result.length).not.toEqual(0)
  })

  it('update method should update the product', async () => {
    const result: product = await testProduct.update(1, {
      name: 'Test Product',
      price: 50,
      category: 'Test Category',
    })
    if (result) {
      expect(result.name).toBe('Test Product')
      expect(result.price).toBe(50)
      expect(result.category).toBe('Test Category')
    }
  })

  it('delete method should delete the product', async () => {
    const result: product = await testProduct.delete(1)
    expect(result).toBeUndefined()
  })
})
