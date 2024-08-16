import asyncHandler from "express-async-handler"
import Product from '../models/productModel.js'



//@getProducts fetch all products
//@route GET /api/products
//@access public
const getProducts =asyncHandler(async (req,res)=>{
    const products = await Product.find({})  // empty object to get all products
    res.json(products)
   
})

//@getProducts fetch one product
//@route GET /api/products/:id
//@access public
const getProductById= asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)

    if(product){
        return res.json(product)
    }else{
        res.status(404)
        throw new Error('Product not Found')
    
    }
    
})




export  {getProducts, getProductById}