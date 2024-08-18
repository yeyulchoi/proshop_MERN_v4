import React from 'react'  
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader  from '../components/Loader'
import {useRegisterMutation} from '../slices/usersApiSlice'
import {setCredentials} from '../slices/authSlice'
import {toast} from 'react-toastify'


const RegisterScreen = () => {
    const [name, setName] =useState('')
    const [email, setEmail] =useState('')
    const [password, setPassword] =useState('')
    const [confirmPassword, setConfirmPassword] =useState('')

 // useEffect : check localStorage if there is user info, then which mean that the user is logged in/ then we want to redirect from the page.
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, {isLoading}] =useRegisterMutation()  // login function?! state...?- my idea..

    const {userInfo} = useSelector((state)=>state.auth)

    const { search} =useLocation()   //useLocation has three property: pathname, search and hash//the current URL in the browser. Gets the current URL location, including query parameters.// location.search>> e.g., '?redirect=/profile'
    const sp = new URLSearchParams(search);   //search would be '?category=electroinics&sort=price'
    const redirect =sp.get('redirect') || '/';   //URLSearchParams:work with query string parameters in the URL. It allows you to parse, manipulate, and retrieve query parameters in a user-friendly way.
// the sp object interact with these parameters //sp.get('redirect'): This method retrieves the value of the query parameter named 'redirect' from the URLSearchParams instance. If the parameter is not present, it returns null.
    //|| '/': The logical OR (||) operator is used here to provide a default value. If sp.get('redirect') returns null (meaning the 'redirect' parameter is not found), redirect will default to '/'.
    // / "If there’s a specific place I should go based on the GPS input, take me there. Otherwise, take me to the default home location."
    
    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        } 
    },[userInfo, redirect, navigate])



    const submitHandler =async (e)=>{
        e.preventDefault()

        if(password !== confirmPassword){
            toast.error('Passwords do not match');
            return;
        }else{
            try {
                const res = await register({name, email, password}).unwrap();
                dispatch(setCredentials({...res}))
                navigate(redirect);
           } catch (error) {
            toast.error(error?.data?.message || error.error)
            
           } 

        }
      
    }

  return (
    <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>
       {/* // The redirect parameter is included in the URL when a user is trying to access a protected page (like /profile) but isn’t logged */}
       <Form.Group controlId='name' className='my-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email' className='my-2'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className='my-2'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter_password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword' className='my-3'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'  disabled ={isLoading}>
                Register
            </Button>
            
            {isLoading && <Loader/>}
            </Form>
            <Row className='py-3'>
                <Col>
                Already have an account?{' '}   
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                </Col>
            </Row> 
        
    </FormContainer>
  )
}

export default RegisterScreen
