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

})
