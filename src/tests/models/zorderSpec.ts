import { Order } from '../../models/order'

const testOrder = new Order()

describe('Order Model', () => {
  it('create method should be defined', () => {
    expect(testOrder.create).toBeDefined()
  })

  it('show user order method should be defined', () => {
    expect(testOrder.showOrderWithProducts).toBeDefined()
  })

  it('show completed orders method should be defined', () => {
    expect(testOrder.showUserCompletedOrders).toBeDefined()
  })

  it('create method should create a new order', async () => {
    const order = {
      user_id: 1,
      status: 'completed',
      products: [
        {
          order_id: 1,
          product_id: 1,
          quantity: 1,
        },
      ],
    }
    const createdOrder = await testOrder.create(order)
    expect(createdOrder).toBeDefined()
  })

  it('show completed orders method should return completed orders with products', async () => {
    const completedOrders = await testOrder.showUserCompletedOrders(1)
    expect(completedOrders).toBeDefined()
  })
})
