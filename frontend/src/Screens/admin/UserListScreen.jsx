import {LinkContainer} from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash  } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
// import Paginate from '../../components/Paginate';
import {
    useGetUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserDetailsMutation,
  
} from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

const UserListScreen = () => {
    // const { pageNumber } = useParams();

    const { data:users, isLoading, error, refetch } = useGetUsersQuery({});
  //  console.log(data.map((i)=>i.name))  --need to initialize data as  array.otherwise, the errors occured.
  
  
    const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();
  
    const deleteHandler = async (id) => {
      if (window.confirm('Are you sure')) {
        try {
            await deleteUser(id);
            toast.success('User Deleted')           
            refetch();
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    };
  
    // const [createProduct, { isLoading: loadingCreate }] =   useUpdateUserDetailsMutation();
  
    const createUserHandler = async () => {

    //   if (window.confirm('Are you sure you want to create a new product?')) {
    //     try {
    //       await createProduct();
    //       refetch();
    //     } catch (err) {
    //       toast.error(err?.data?.message || err.error);
    //     }
    //   }
    };
  
    return (
      <>
        <Row className='align-items-center'>
          <Col>
            <h1>Users</h1>
          </Col>
          <Col className='text-end'>
            <Button className='my-3' onClick={createUserHandler}>
              <FaPlus /> Create User
            </Button>
          </Col>
        </Row>
  
        {/* {loadingCreate && <Loader />}
        {loadingDelete && <Loader />} */}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <>
          
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER NAME</th>
                  <th>EMAIL</th> 
                  <th>ADMIN?</th>                 
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                    {/* <td>{String(user.isAdmin)}</td> */}
                    <td>
                        {user.isAdmin? (<strong style={{color:'red'}}>Admin</strong>):(<strong style={{color:'blue'}}>User</strong>)}

                    </td>
                    <td>
                     <LinkContainer to={`/admin/user/${user._id}/edit`}>  
                     <Button variant='light' className='btn-sm'>
                        <FaEdit/>
                     </Button>

                     </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FaTrash style={{ color: 'white' }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* <Paginate pages={data.pages} page={data.page} isAdmin={true} /> */}
          </>
        )}
      </>
    );
}

export default UserListScreen
