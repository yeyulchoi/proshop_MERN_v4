import {createSlice} from '@reduxjs/toolkit'

// authSlice: focused on managing the authentication state in the redux store
// main responsibility is to store the user information when the user logs in and to clear that info when the user logs out.
//Whileas  usersApiSlice:APISlice:The usersApiSlice is used to define API interactions, such as making HTTP requests to your backend
//It handles the logic for registering a user, logging in, and logging out by making corresponding API requests to your server.

 //JSON.parse: string back to js object 
const initialState = {                                     
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null,
}

const authSlice =createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.userInfo = action.payload;
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        logout:(state,action)=>{
            state.userInfo =null;
            localStorage.removeItem('userInfo')
        }
    }
})

        
export const {setCredentials, logout} =authSlice.actions;
export default authSlice.reducer;