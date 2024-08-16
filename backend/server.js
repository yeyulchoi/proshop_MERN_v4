import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import productRoutes from './routes/productRoutes.js'
import connectDB from './config/db.js'
import { notFound, errorHandler} from './middleware/errorMiddleware.js'
connectDB()

const port=process.env.PORT || 5000;
const app = express()


app.get('/',(req,res)=>{
    res.send('hello world')
})



app.use( '/api/products',productRoutes)

app.use(notFound)
app.use(errorHandler)





app.listen(port,console.log(`server is running on ${port}`))



