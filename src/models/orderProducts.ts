import Client from '../database'
import { Product } from './product'

export type orderProduct = {
  order_id: number
  product_id: number
  quantity: number
}

export type productWithQuantity = {
  id?: number
  name: string
  price: number
  category: string
  quantity?: number
}

export class OrderProducts {
  async create(
    products: orderProduct[],
    orderId: number
  ): Promise<orderProduct[]> {
    try {
      const conn = await Client.connect()
      const orderProductsArray: orderProduct[] = []
      const orderProductsSql =
        'INSERT INTO order_products (order_id,product_id,quantity) VALUES ($1, $2, $3) RETURNING *'

      for (const product of products) {
        const orderProduct = await conn.query(orderProductsSql, [
          orderId,
          product.product_id,
          product.quantity,
        ])
        orderProductsArray.push(orderProduct.rows[0])
      }
      conn.release()
      return orderProductsArray
    } catch (err) {
      throw new Error(`couldn't create order products => ${err}`)
    }
  }

  async showOrderProducts(orderId: number): Promise<productWithQuantity[]> {
    try {
      //get data from order product table
      const conn = await Client.connect()
      const sql =
        'SELECT product_id , quantity FROM order_products WHERE order_id=($1)'
      const orderProducts = await conn.query(sql, [orderId])

      //get full data of each product
      const newProduct = new Product()
      const newProducts: productWithQuantity[] = []
      for (const product of orderProducts.rows) {
        newProducts.push({
          ...(await newProduct.show(product.product_id)),
          quantity: product.quantity,
        })
      }
      conn.release()
      return newProducts
    } catch (err) {
      throw new Error(`couldn't get order products => ${err}`)
    }
  }
}
