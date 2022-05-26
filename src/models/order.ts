import Client from '../database'

import {
  orderProduct,
  OrderProducts,
  productWithQuantity,
} from './orderProducts'

export type order = {
  id?: number
  user_id: number
  status: string
  products: orderProduct[]
}

export type orderWithProducts = {
  id?: number
  user_id: number
  status: string
  products: productWithQuantity[]
}

const newOrderProducts = new OrderProducts()

export class Order {
  async create(order: order): Promise<order> {
    try {
      const conn = await Client.connect()
      //create order
      const orderSqlQuery =
        'INSERT INTO orders (user_id,status) VALUES ($1, $2) RETURNING *'
      const result = await conn.query(orderSqlQuery, [
        order.user_id,
        order.status,
      ])
      conn.release()
      const createdOrder = result.rows[0]
      //create order products with orderProducts service
      const orderProductsArray = await newOrderProducts.create(
        order.products,
        createdOrder.id
      )
      return { ...createdOrder, products: orderProductsArray }
    } catch (err) {
      throw new Error(`Couldn't create order => ${err}`)
    }
  }

  async showOrderWithProducts(id: number): Promise<orderWithProducts> {
    try {
      // get order data
      const conn = await Client.connect()
      const orderSql = 'SELECT * FROM orders WHERE user_id=($1)'
      const order = await conn.query(orderSql, [id])
      conn.release()
      const userOrder = order.rows[0]
      console.log(userOrder)
      // get data of products of this order using service
      const orderProducts = await newOrderProducts.showOrderProducts(
        userOrder.id
      )
      return {
        ...userOrder,
        orderProducts,
      }
    } catch (err) {
      throw new Error(`Couldn't get this order => ${err}`)
    }
  }

  async showUserCompletedOrders(id: number): Promise<orderWithProducts[]> {
    try {
      // get completed orders data
      const conn = await Client.connect()
      const orderSql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)'
      const completedOrders = await conn.query(orderSql, [id, 'completed'])

      // get data of products of this order using service
      if (completedOrders.rows.length > 0) {
        const userCompletedOrders: orderWithProducts[] = []
        for (const completedOrder of completedOrders.rows) {
          const orderProducts = await newOrderProducts.showOrderProducts(
            completedOrder.id
          )
          userCompletedOrders.push({
            ...completedOrder,
            products: orderProducts,
          })
        }
        conn.release()
        return userCompletedOrders
      }
      return []
    } catch (err) {
      throw new Error(`Couldn't get completed orders => ${err}`)
    }
  }
}
