import Client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env

export type user = {
  id?: number
  firstName?: string
  lastName?: string
  userName?: string
  password: string
}

export type userUpdate = {
  id?: number
  firstName?: string
  lastName?: string
  userName?: string
}

export class User {
  async index(): Promise<user[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT id,first_name,last_name,user_name FROM users'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Couldn't get users because of ${err}`)
    }
  }

  async show(id: number): Promise<user> {
    try {
      const conn = await Client.connect()
      const sql =
        'SELECT id,first_name,last_name,user_name FROM users WHERE id =($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Couldn't get user with this id : ${id}=> ${err}`)
    }
  }

  async create(user: user): Promise<user> {
    try {
      const conn = await Client.connect()
      const sql =
        'INSERT INTO users (first_name,last_name,user_name,password) VALUES($1,$2,$3,$4) RETURNING *'
      const hashedPassword = bcrypt.hashSync(
        user.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      )
      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        user.userName,
        hashedPassword,
      ])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Couldn't add new user => ${err}`)
    }
  }

  async update(id: number, user: userUpdate): Promise<user> {
    try {
      const conn = await Client.connect()
      const sql =
        'UPDATE users SET first_name = $1, last_name = $2 , user_name = $3 WHERE id = $4 RETURNING *'
      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        user.userName,
        id,
      ])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Couldn't update this user => ${err}`)
    }
  }

  async login(username: string, password: string): Promise<user | null> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users WHERE user_name=($1)'
      const result = await conn.query(sql, [username])
      if (result.rows.length > 0) {
        const user: user = result.rows[0]
        if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
          return user
        }
      }
      conn.release()
      return null
    } catch (err) {
      throw new Error(`Could not find this user ${username} => ${err}`)
    }
  }
}
