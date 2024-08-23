import React from 'react'  
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader  from '../components/Loader'
import {useLoginMutation} from '../slices/usersApiSlice'
import {setCredentials} from '../slices/authSlice'
import {toast} from 'react-toastify'

 
const LoginScreen = () => {
    const [email, setEmail] =useState('')
    const [password, setPassword] =useState('')

 // useEffect : check localStorage if there is user info, then which mean that the user is logged in/ then we want to redirect from the page.
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, {isLoading}] =useLoginMutation()  // login function?! state...?- my idea..

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
    },[navigate,userInfo, redirect ])



    const submitHandler =async (e)=>{
        e.preventDefault()
       try {
            const res = await login({email, password}).unwrap();
            dispatch(setCredentials({...res}))
            navigate(redirect);
       } catch (err) {
        toast.error(err?.data?.message || err?.error)
        
       }
    }

  return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email' className='my-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className='my-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Button disabled ={isLoading} type='submit' variant='primary' className='mt-2' >
                Sign In
            </Button>
            
            {isLoading && <Loader/>}
            </Form>
            <Row className='py-3'>
                <Col>
                New Customer? {' '}
                  <Link to={redirect? `/register?redirect=${redirect}`:'/register'}>Register</Link>
                </Col>
            </Row>
        
    </FormContainer>
  )
}

export default LoginScreen
