import express, { Request, Response, NextFunction } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { user, userUpdate, User } from '../models/user'

const secretKey = process.env.TOKEN_SECRET as Secret
const client = new User()

export const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization as unknown as string
    const jwtToken = header.split(' ')[1]
    const decoded = jwt.verify(jwtToken, secretKey)
    //sending data of logged in user to the next middleware
    res.locals.authUser = decoded
    next()
  } catch (error) {
    res.status(401)
    res.send('Unauthorized')
  }
}

const index = async (req: Request, res: Response) => {
  try {
    const users: user[] = await client.index()
    res.json(users)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number
    const user: user = await client.show(id)
    res.json(user)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const userData: user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,
    }
    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.userName ||
      !userData.password
    ) {
      res.status(400)
      res.send(
        'sorry these data are required firstname , lastname , username and password'
      )
      return
    }
    const newUser: user = await client.create(userData)
    const token = jwt.sign({ user: newUser }, secretKey)
    res.json({ user: newUser, token: token })
  } catch (err) {
    res.status(400)
    res.json({ message: err })
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number
    if (!id) {
      res.status(400)
      res.send("can't find id of user in the url.")
      return
    }
    const userData: userUpdate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
    }
    if (!userData.firstName || !userData.lastName || !userData.userName) {
      res.status(400)
      res.send(
        'sorry these data are required firstname , lastname and username '
      )
      return
    }
    const updatedUser: userUpdate = await client.update(id, userData)
    res.json({ user: updatedUser })
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const userName = req.body.userName
    const password = req.body.password
    if (!userName || !password) {
      res.status(400)
      res.send('sorry username and password are required.')
      return
    }
    const authenticated: user | null = await client.login(userName, password)
    if (!authenticated) {
      res.status(401)
      res.send('sorry wrong username or password')
    }
    const token = jwt.sign({ user: authenticated }, secretKey)
    res.json(token)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const userRouter = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:id', verifyAuthToken, show)
  app.post('/users/create', create)
  app.post('/users/login', login)
  app.put('/users/:id', verifyAuthToken, update)
}

export default userRouter
