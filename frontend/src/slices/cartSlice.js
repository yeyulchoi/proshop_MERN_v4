
import {createSlice} from '@reduxjs/toolkit'
import {updateCart} from '../utils/cartUtils'

const initialState=localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart') ): {cartItems:[]}



const cartSlice = createSlice({
    name:'cart',
    initialState,       // state of cart
    reducers:{          // action include any data inside of payload  // sending an item to the cart which we can access  with action.payload
        addToCart:(state, action)=>{
            // item including the field / payload of item generated from the (addToCart)action(from dispatch).
            const item = action.payload       // x: initial state's cart item/  item. is newly added item
            const existItem = state.cartItems.find((x)=>x._id === item._id);   //use () not using {}
            
            if(existItem){
                state.cartItems = state.cartItems.map((x)=>(x._id === existItem._id ? item:x))  // if new added item is already in exiting items, existing item is replaced with new item
            }else{
                state.cartItems=[...state.cartItems, item] // in addition to the existing items, add new item
            }
            return updateCart(state)
        },
        removeFromCart:(state,action)=>{
            state.cartItems = state.cartItems.filter((x)=>x._id !== action.payload) // chosen id is passed and is in the payload. the payload has id.
            return updateCart(state)
        }
    }})




        
export const {addToCart, removeFromCart} = cartSlice.actions
  
export default cartSlice.reducer;



