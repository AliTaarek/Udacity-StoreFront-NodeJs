import express, { Request, Response } from 'express'
import { order, Order } from '../models/order'
import { verifyAuthToken } from './userHandler'

const orderClient = new Order()

const create = async (req: Request, res: Response) => {
  try {
    const orderData: order = {
      user_id: res.locals.authUser.user.id,
      status: req.body.status,
      products: req.body.products,
    }
    if (
      !orderData.status.match(/^(active|completed)$/) ||
      !orderData.products
    ) {
      res.status(400)
      res.send(
        `sorry these data are required status ( active or completed ) and products`
      )
      return
    }
    const newOrder = await orderClient.create(orderData)
    res.json({ order: newOrder })
  } catch (err) {
    res.status(400)
    res.json({ message: err })
  }
}

const showUserCurrentOrder = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.authUser.user.id
    const userOrder = await orderClient.showOrderWithProducts(userId)
    res.json({ userCurrentOrder: userOrder })
  } catch (err) {
    res.status(400)
    res.json({ message: err })
  }
}

const showUserCompletedOrder = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.authUser.user.id
    const userOrders = await orderClient.showUserCompletedOrders(userId)
    res.json({ userCompletedOrders: userOrders })
  } catch (err) {
    res.status(400)
    res.json({ message: err })
  }
}

const orderRouter = (app: express.Application) => {
  app.post('/orders/create', verifyAuthToken, create)
  app.get('/orders/user', verifyAuthToken, showUserCurrentOrder)
  app.get('/orders/user/completed', verifyAuthToken, showUserCompletedOrder)
}

export default orderRouter
