import React from 'react'
// import {apiSlice} from "../apiSlice"
import {PRODUCTS_URL} from "../constants"
import {useState} from 'react'
import { useDispatch } from 'react-redux';
import {useParams, Link, useNavigate } from 'react-router-dom';
import {Form,Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap'
import {useGetProductDetailsQuery} from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import {addToCart} from '../slices/cartSlice'
import { productsApiSlice } from '../slices/productsApiSlice';
import { useSelector } from 'react-redux';

const ProductScreen = () => {
    const {id:productId}=useParams()
    const navigate = useNavigate()
    const dispatch =useDispatch()
    const[qty,setQty]= useState(1);

    
    const {data:product, error, isLoading}= useGetProductDetailsQuery(productId)
   
    const addToCartHandler=()=>{
        
        dispatch(addToCart({...product, qty}))
       
        navigate('/cart')
    }


  return (
    <>
    <Link to='/' className='btn btn-light my-3'>Go Back</Link>

    {
        isLoading?( <h2><Loader/></h2>)
        :error?(<Message variant="danger">{ error.message || 'An error occurred'}</Message>):(
            <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name}  fluid />
                </Col>
                <Col md={4}>
                <ListGroup variant="flush">
                    <ListGroup.Item>{product.name}</ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value ={product.rating} text={product.numReviews}/>
                    </ListGroup.Item>
                    <ListGroup.Item>${product.price}</ListGroup.Item>  
                    <ListGroup.Item>${product.description}</ListGroup.Item>            
                </ListGroup>
                </Col>
                <Col md={3} >
                <Card >        
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Row>
                            <Col md={6}>Price:</Col>
                            <Col md={6}>${product.price}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col md={6}>Status:</Col>
                            <Col md={6}> {product.countInStock>0 ? "In Stock" : "Out of Stock" }</Col>
                        </Row>
                    </ListGroup.Item>
                    {product.countInStock >0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col >Quantity:</Col>
                                <Col > 
                                    <Form.Control as="select"
                                     value={qty} 
                                     onChange={(e)=>setQty(Number(e.target.value))}>
                                        {[...Array(product.countInStock).keys()].map((x)=>(                                            
                                            <option key={x+1}   value= {x+1}  >
                                                {x+1}    
                                            </option>      
                                        ))}
                                       
                                    </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                    )}
                    <ListGroup.Item>
                        <Button onClick={addToCartHandler} className="btn-block" disabled={product.countInStock ===0}>
                            Go to Cart
                        </Button>
                    </ListGroup.Item>  
                </ListGroup>
                </Card>
                </Col>
            </Row>

        )
    }

    
    </>
  )
}

export default ProductScreen
