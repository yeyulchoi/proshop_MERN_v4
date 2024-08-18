import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {Form,Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap'
import { FaTrash} from 'react-icons/fa'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../slices/cartSlice'


const CartScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

   
    const {cartItems} =useSelector((state)=> state.cart)

    const addToCartHandler= async(product, qty)=>{
      dispatch(addToCart({...product,qty}))  // reason for using {}: create an object that contains all properties of product , qty(is added if there was not there OR override the existing qty.)
    }

    const removeFromCartHandler= async(id)=>{
      dispatch(removeFromCart(id))  //reason for not using {} is cos to pass primitive type like string or number. no need to wrap it in an object.
    
    }

    const checkoutHandler=()=>{
      navigate('/login?redirect=/shipping')
    }

  return (
   
    <Row>
      <Col md={8}>
        <h1 style={{marginBottom: '20px'}}>Shopping Cart</h1>
          {cartItems.length ===0 ? (
            <Message>
              Your cart is empty <Link to ='/'> Go Back</Link>
            </Message>
            ):(
              <ListGroup variant ='flush'>
                {cartItems.map((item)=>(
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid  rounded/> 
                                                                        
                      </Col>
                      <Col md={3} >
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2}>
                        <Form.Control
                          as='select' value={item.qty} 
                          onChange={(e)=>addToCartHandler(item, Number(e.target.value))}>
                            {
                              [...Array(item.countInStock).keys()].map((x)=>(
                                <option key={x+1} value={x+1} >
                                  {x+1}
                                </option>
                              ))                            
                            }
                            </Form.Control>                      
                      </Col>
                      <Col md={3}>  
                      {/* // should not use this {removeFromCartHandler},cos this function will be called right away.and will delete all items */}
                      {/* it needs to be a function that then call that. */}
                      <Button type='button' variant ='light'
                       onClick={()=>removeFromCartHandler(item._id)}> 
                        <FaTrash/>
                      </Button>
                      </Col>
                      
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}      
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((accPrice, item)=>accPrice+item.qty,0)})
                items
              </h2>
              ${cartItems
              .reduce((accPrice, item)=>accPrice+Number(item.price * item.qty),0)
              .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" 
              className='btn-block' 
              disabled={cartItems.length=== 0}
                onClick={checkoutHandler}>Procced to Checkout</Button>
            </ListGroup.Item>
          </ListGroup>
          
        </Card>
      
      </Col>
    </Row>
  )
}

export default CartScreen
