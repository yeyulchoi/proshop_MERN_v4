import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,

} from '../../slices/usersApiSlice';

const UserEditScreen = () => {

  const navigate = useNavigate();

  const { id: userId } = useParams();
  const {data:user, isLoading, error, refetch}=useGetUserDetailsQuery(userId)
  const [updateUserDetails, { isLoading: loadingUpdate }] =  useUpdateUserDetailsMutation();


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);



 

  

  // const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log({ userId, name, email, isAdmin });
    try {
      await updateUserDetails(   // this method is to update data onto DB. so use method in userAPI
      {userData:{userId, name, email, isAdmin}}//// VERY VERY Careful. this should used considering the dataName you used in user API
      //if I used  query(userData)(,not ({userData}), then use {userId, name, email, isAdmin})
    ).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('User Info Updated');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
     
    }
  }, [user]);


  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter price'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

           

            <Form.Group controlId='isAdmin' className='my-2'>
              <Form.Check 
               type='checkbox'
               label="Is Admin"
               checked={isAdmin}
               onChange={(e)=>setIsAdmin(e.target.checked)}
               ></Form.Check>
             
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default UserEditScreen
