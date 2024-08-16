import React from 'react'
import {Badge,Navbar, Container, Nav } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import { FaShopify, FaUser} from 'react-icons/fa';
import logo from '../assets/logo.png'
import { useSelector } from 'react-redux';

const Header = () => {

  const {cartItems} = useSelector((state)=>state.cart)
  
  return (
    <Navbar bg="dark" variant="dark" collapseOnSelect expand="md"  >
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand ><img src={logo} alt="proshop" /> 
          ProShop
          </Navbar.Brand>
        </LinkContainer>       
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <LinkContainer to='/cart'>          
            <Nav.Link >
              <FaShopify />Cart
            {
              cartItems.length > 0 &&(
                <Badge pill bg='success' style={{marginLeft:'5px'}}>
                  {cartItems.reduce((acc,currentItem)=>acc+currentItem.qty,0)}
                </Badge>
              )
            }</Nav.Link>
          </LinkContainer>  
          <LinkContainer to="/login"> 
            <Nav.Link ><FaUser/>Login</Nav.Link>
          </LinkContainer>      
          </Nav>    
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
 
}

export default Header
