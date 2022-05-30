import Client from '../database'

export type product = {
  id?: number
  name: string
  price: number
  category: string
}

export class Product {
  async index(): Promise<product[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Couldn't get products from database => ${err}`)
    }
  }

  async show(id: number): Promise<product> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Couldn't find product with this id => ${err}`)
    }
  }

  async showByCategory(category: string): Promise<product[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products WHERE category=($1)'
      const result = await conn.query(sql, [category])
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Couldn't find products with this category => ${err}`)
    }
  }

  async create(product: product): Promise<product> {
    try {
      const conn = await Client.connect()
      const sql =
        'INSERT INTO products (name,price,category) VALUES($1,$2,$3) RETURNING *'
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Couldn't create new product => ${err}`)
    }
  }

  async update(id: number, product: product): Promise<product> {
    try {
      const conn = await Client.connect()
      const sql =
        'UPDATE products SET name = $1, price = $2 , category = $3 WHERE id = $4 RETURNING *'
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
        id,
      ])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not update this product => ${err}`)
    }
  }

  async delete(id: number): Promise<product> {
    try {
      const conn = await Client.connect()
      const sql = 'DELETE FROM products WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not delete this product => ${err}`)
    }
  }
}
