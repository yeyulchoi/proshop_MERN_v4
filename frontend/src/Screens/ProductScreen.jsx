import React from 'react'
// import {apiSlice} from "../apiSlice"
import {PRODUCTS_URL} from "../constants"
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useParams, Link, useNavigate } from 'react-router-dom';
import {Form,Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap'
import {useGetProductDetailsQuery, useCreateReviewMutation} from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import {addToCart} from '../slices/cartSlice'
import {toast} from 'react-toastify'

const ProductScreen = () => {
    const {id:productId}=useParams()
    const navigate = useNavigate()
    const dispatch =useDispatch()
    const[qty,setQty]= useState(1);
    const [rating, setRating] =useState(0)
    const [comment,setComment] =useState('')

    
   

    const {data:product, isLoading, refetch,error}= useGetProductDetailsQuery(productId)
    const [createReview,{ isLoading:isProductReviewLoading , error:reviewError}] =useCreateReviewMutation(productId)
    const {userInfo} = useSelector((state)=>state.auth)
    const addToCartHandler=()=>{
        
        dispatch(addToCart({...product, qty}))
       
        navigate('/cart')
    }   

    const submitHandler=async (e)=>{
        e.preventDefault();

        try {
          await createReview({
            productId,
            rating,
            comment,
          }).unwrap();
          refetch();
          toast.success('Review created successfully');
          setRating(0)
          setComment('')
        } catch (reviewError) {
          toast.error(reviewError?.data?.message || reviewError.error);
        }
    }
  return (
    <>
    <Link to='/' className='btn btn-light my-3'>Go Back</Link>

    {
        isLoading?( <h2><Loader/></h2>)
        :error?(<Message variant="danger">{ error.message || 'An error occurred'}</Message>):
        (
            <>


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
            <Row className='review'>
              <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length===0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                    {product.reviews.map(review=>(
                        <ListGroup.Item key={review._id}>
                            <strong>Name: {review.name}</strong>
                            <Rating value={review.rating} />
                            <p>{review.createdAt ? review.createdAt.substring(0, 10) : 'N/A'}</p>
                            <p>{review.comment}</p>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                     <h2>Write a Customer Review</h2>

                        {isProductReviewLoading && <Loader />}

                    {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className='my-2' controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          required
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className='my-2' controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={isProductReviewLoading}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            </>
        )
    }

    
    </>
  )
}

export default ProductScreen
