import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
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
            <Nav.Link to='/login'><FaUser/>Sign In</Nav.Link>            
          </LinkContainer>   )}
          {/* // addition of admin */}
           {(userInfo && userInfo.isAdmin) &&(
            <NavDropdown title='Admin' id='adminmenu'>      
              <NavDropdown.Item as={Link} to='/admin/orderlist'>Orders</NavDropdown.Item>           
              <NavDropdown.Item as={Link} to='/admin/productlist'>Product</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/admin/userlist'>User</NavDropdown.Item>
                                
           </NavDropdown>
           )}
          </Nav>    
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
 
}

export default Header
