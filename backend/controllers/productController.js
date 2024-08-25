import asyncHandler from "express-async-handler"
import Product from '../models/productModel.js'



//@getProducts fetch all products
//@route GET /api/products
//@access public
const getProducts =asyncHandler(async (req,res)=>{
//pagination
    const pageSize =3;   // the number of items per page
    const page = Number(req.query.pageNumber) || 1;
       

//search              // 'i' is case insensitive.
const keyword =req.query.keyword?{name:{$regex:req.query.keyword, $options:'i'}}:{};

 //total number of pages. mongoose method.count documents- Model.countDocuments
 const count =await Product.countDocuments({...keyword})


    const products = await Product.find({...keyword})  // empty object to get all products
                                          .limit(pageSize)
                                          .skip(pageSize*(page-1))
    res.json({products, page, pages:Math.ceil(count/pageSize)})
    //The Product.find({}) method is used to retrieve documents (records) from the Product collection in MongoDB.
   //The empty object {} as the argument means "find all documents" in the collection.
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


// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    });
  
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  });

  // @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;
  
    const product = await Product.findById(req.params.id);
  
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
  
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });

  // @desc    Delete a product
  // @route   DELETE /api/products/:id
  // @access  Private/Admin
  const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.status(200).json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });

  // @desc    Create reviews
  // @route   POST /api/products/:id/reviews
  // @access  Private
  const createProductReview = asyncHandler(async (req, res) => {
    const {name,rating, comment} =req.body

    const product = await Product.findById(req.params.id)

    if (product) {
      const alreadyReviewed = product.reviews.find(  // not finding through product, but finding through review.
        //call back function
        (review) => review.user.toString === req.user._id.toString()//review user id mataches  login user id = turn out to be true: then -> already reviewed.
      )
      if (alreadyReviewed){
        res.status(400);
        throw new Error('Product already reviewed')
      }
      const review ={
        user: req.user._id,
        name : req.user.name,
        rating: Number(rating),
        comment:comment, 
        
      }
      
     product.reviews.push(review)

     product.numReviews = product.reviews.length;

     product.rating= product.reviews.reduce((acc, review)=>acc+review.rating, 0)/product.reviews.length;

     await product.save();
     res.status(201).json({message: 'Review added'})
    }else{
      res.status(404);
      throw new Error('Resource not found')
    }
  });
      // @desc    Get top rated products
      // @route   GET /api/products/top
      // @access  Public
        const getTopProducts = asyncHandler(async (req, res) => {
          const products = await Product.find({}).sort({ rating: -1 }).limit(3);  //retrieve a list of products from DB using Mongoose
          res.json(products);                       
          
          
                                  //.find({}):fetch all documents in the collection.
                                  //.sort({ rating: -1 }):based on teh specified field/ rating in descending order(higher number comes first)
                                    //.limit(3);the number of documents returned by the query.

                                    // don't have to use .unwrap() (when in using await. cos  it is not where Redux Toolkit Query did not wrap the promise)
                                    //in this case , await give the resolved value directly.
          
        });



export  {getProducts, getProductById, createProduct,  updateProduct, deleteProduct,
  createProductReview, getTopProducts,
  }