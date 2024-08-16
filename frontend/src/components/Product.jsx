import React from 'react'
import { Card, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import Rating from './Rating';
import ProductScreen from '../Screens/ProductScreen';






const Product = ({product}) => {

  return (
    <Card className='my-3 p-3' style={{ width: '18rem' }}>
      <Link to={`/product/${product._id}`}>
      <Card.Img src={product.image} variant='top'/>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
                <strong>{product.name}</strong>
            </Card.Title>
        </Link>  
        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.numReviews} views`}  />
        </Card.Text >     
        <Card.Text as="h3">
          ${product.price}
        </Card.Text>
        
        <Button variant="primary">Go to Cart</Button>
      </Card.Body>
    </Card>
  )
}

export default Product
