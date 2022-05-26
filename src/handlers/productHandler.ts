import express, { Request, Response, NextFunction } from 'express'
import { product, Product } from '../models/product'
import { verifyAuthToken } from './userHandler'

const productClient = new Product()

const index = async (req: Request, res: Response) => {
  try {
    const products: product[] = await productClient.index()
    res.json(products)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number
    const product: product = await productClient.show(id)
    res.json(product)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const showByCategory = async (req: Request, res: Response) => {
  try {
    const category = req.params.category as unknown as string
    const products: product[] = await productClient.showByCategory(category)
    res.json({ products: products })
  } catch (err) {
    res.status(400)
    res.json({ message: err })
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const productData: product = {
      name: req.body.name as unknown as string,
      price: req.body.price as unknown as number,
      category: req.body.category as unknown as string,
    }
    if (!productData.name || !productData.price || !productData.category) {
      res.status(400)
      res.send(`sorry these data are required name , price and category`)
      return
    }
    const newProduct: product = await productClient.create(productData)
    res.json({ product: newProduct })
  } catch (err) {
    res.status(400)
    res.json({ message: err })
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number
    const productData: product = {
      name: req.body.name as unknown as string,
      price: req.body.price as unknown as number,
      category: req.body.category as unknown as string,
    }
    if (!productData.name || !productData.price || !productData.category) {
      res.status(400)
      res.send('sorry these data are required name , price and category')
      return
    }
    const editedProduct: product = await productClient.update(id, productData)
    res.json({ product: editedProduct })
  } catch (err) {
    res.status(400)
    res.json({ message: err })
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number
    await productClient.delete(id)
    res.send(`product successfully deleted.`)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const productRouter = (app: express.Application) => {
  app.get('/products', index)
  app.get('/product/:id', show)
  app.get('/products/:category', showByCategory)
  app.post('/products/create', verifyAuthToken, create)
  app.put('/products/:id', verifyAuthToken, update)
  app.delete('/products/:id', verifyAuthToken, deleteProduct)
}

export default productRouter
