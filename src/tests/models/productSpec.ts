import { Product, product } from '../../models/product'

const testProduct = new Product()

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

  it('create method should create a new product', async () => {
    const productData: product = {
      name: 'product1',
      price: 200,
      category: 'category1',
    }
    const newProduct = await testProduct.create(productData)
    expect(newProduct).toEqual({
      id: 1,
      name: 'product1',
      price: 200,
      category: 'category1',
    })
  })

  it('index method should return all products', async () => {
    const products: product[] = await testProduct.index()
    expect(products.length).toBe(1)
    expect(products[0]).toEqual({
      id: 1,
      name: 'product1',
      price: 100,
      category: 'category1',
    })
  })

  it('show method should return a product', async () => {
    const product: product = await testProduct.show(1)
    expect(product).toEqual({
      id: 1,
      name: 'product1',
      price: 100,
      category: 'category1',
    })
  })

  it('showByCategory method should return a product', async () => {
    const products: product[] = await testProduct.showByCategory('category1')
    expect(products.length).toBe(1)
    expect(products[0]).toEqual({
      id: 1,
      name: 'product1',
      price: 100,
      category: 'category1',
    })
  })

  it('update method should update a product', async () => {
    const productData: product = {
      name: 'product1',
      price: 200,
      category: 'category1',
    }
    const updatedProduct = await testProduct.update(1, productData)
    expect(updatedProduct).toEqual({
      id: 1,
      name: 'product1',
      price: 200,
      category: 'category1',
    })
  })

  it('delete method should delete a product', async () => {
    await testProduct.delete(1)
    const result: product[] = await testProduct.index()
    expect(result).toEqual([])
  })
})
