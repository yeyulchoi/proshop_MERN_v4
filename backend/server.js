import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import { notFound, errorHandler} from './middleware/errorMiddleware.js'
import uploadRoutes from './routes/uploadRoutes.js'



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
app.use('/api/orders', orderRoutes)
app.use('/api/uploads', uploadRoutes)   // make sure to not forget to match uploads with endpoint in frontend!!!! spent whole time!!!


app.get('/api/config/paypal',(req,res)=> res.send({clientId: process.env.PAYPAL_CLIENT_ID}))


const __dirname = path.resolve() //for static files, set __dirname to current directory   //path.resolve: current direcotry: proshop-eCommerce-main
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))   //__dirname: the directory path of the current module/file: backend.


app.use(notFound)
app.use(errorHandler)





app.listen(port,console.log(`server is running on ${port}`))



