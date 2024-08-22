import asyncHandler from "express-async-handler"
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
// import { calcPrices } from '../utils/calcPrices.js';
// import { verifyPayPalPayment, checkIfNewTransaction } from '../utils/paypal.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {


  const { orderItems, shippingAddress, paymentMethod ,
     itemsPrice, taxPrice, shippingPrice,totalPrice,} = req.body;
    // there is orderitems array, but it is empty.
     if (orderItems && orderItems.length===0){
        res.status(400)
        throw new Error('no order items')
     }else{
       const order = new Order({
      orderItems: orderItems.map((x)=>({...x,product:x._id, _id:undefined})),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,     
      shippingPrice,
      totalPrice,
    });
    const createdOrder=await order.save()
    res.status(201).json(createdOrder);
     }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/my orders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders)

});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user', 'name email' );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }

});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
 const order = await Order.findById(req.params.id)
 if (order) {
  order.isPaid=true;
  order.paidAt=Date.now(),
  order.paymentResult ={    // below from paypal
    id:req.body.id,
    status:req.body.status,
    update_time:req.body.update_time,
    email_address:req.body.payer.email_address
  }

  const updatedOrder=await order.save()
  res.status(200).json(updatedOrder)
 }else{
  res.status(404)
  throw new Error('Order is not found')
 }
 
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {

res.send('order update deliver')
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};