import React from 'react'
import { Row, Col} from 'react-bootstrap';
// import products from '../products'//not using this. since not using next.js, we use useEffect hook in order to fetch the data
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';


const HomeScreen = () => {
  
  const {data:products, isLoading, error} = useGetProductsQuery();
  
  return(
    <>
      { isLoading ? (
        <h2><Loader/></h2>
      ): error ? (
        <Message variant='danger'>{ error.message || 'An error occurred'}</Message>        
      ):(
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product)=>(
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product ={product}/>
              </Col>
            ))} 
          </Row>
        
        </>
      )}
    
    </>

  )

  
}

export default HomeScreen
