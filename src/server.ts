import express, {
  Application,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express'
import bodyParser from 'body-parser'
import userRouter from './handlers/userHandler'
import productRouter from './handlers/productHandler'
import orderRouter from './handlers/orderHandler'
const app: Application = express()

const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

userRouter(app)
productRouter(app)
orderRouter(app)

app.listen(PORT, () => {
  console.log(`Server is starting at port ${PORT}`)
})
app.use((_req: Request, res: Response) => {
  res.status(404).send({ message: 'This page is not found' })
})

app.use(
  (
    error: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return res.status(500).send({ message: error + '' })
  }
)

export default app
