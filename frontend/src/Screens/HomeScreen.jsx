import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { Row, Col} from 'react-bootstrap';
// import products from '../products'//not using this. since not using next.js, we use useEffect hook in order to fetch the data
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';


const HomeScreen = () => {
  const {pageNumber, keyword }=useParams();
  const {data, isLoading, error} = useGetProductsQuery({keyword, pageNumber, });  // data is not just holding products, with creation of pages, other elements are included. 
                                                                  //  SO the below it should be data.products. in data.products.map((product)
  
  return(
    <>
    {!keyword ? <ProductCarousel/> :<Link to ='/' className='btn btn-light'>Go Back</Link>}
      { isLoading ? (
        <h2><Loader/></h2>
      ): error ? (
        <Message variant='danger'>{ error.message || 'An error occurred'}</Message>        
      ):(
        <>
       
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product)=>(
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product ={product}/>
              </Col>
            ))} 
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        
        </>
      )}
    
    </>

  )

  
}

export default HomeScreen
