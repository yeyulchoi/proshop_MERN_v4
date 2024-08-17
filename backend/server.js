import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import { notFound, errorHandler} from './middleware/errorMiddleware.js'
connectDB()

const port=process.env.PORT || 5000;
const app = express()


app.get('/',(req,res)=>{
    res.send('hello world')
})

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Cookie parser middleware
app.use(cookieParser())  // allow to access req.cookie (req.cookie.jwt)

app.use( '/api/products',productRoutes)
app.use( '/api/users',userRoutes)

app.use(notFound)
app.use(errorHandler)





app.listen(port,console.log(`server is running on ${port}`))



