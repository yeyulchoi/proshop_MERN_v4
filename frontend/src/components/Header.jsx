import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Badge,Navbar, Container, Nav ,NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import { FaShopify, FaUser} from 'react-icons/fa';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import logo from '../assets/logo.png'
import { useSelector, useDispatch} from 'react-redux';

const Header = () => {

  const {cartItems} = useSelector((state)=>state.cart)
  const {userInfo} = useSelector((state)=>state.auth)

  const dispatch = useDispatch();
  const navigate=useNavigate()

  const [logoutApiCall] = useLogoutMutation();
  
  const logoutHandler=async()=>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

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
          { userInfo ? (
            <NavDropdown title={userInfo.name} id='username'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler} >
                logout
              </NavDropdown.Item>
            </NavDropdown>
          ):(  <LinkContainer to="/login"> 
            <Nav.Link her='/login'><FaUser/>Sign In</Nav.Link>
          </LinkContainer>   )}
           
          </Nav>    
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
 
}

export default Header
