export const addDecimals =(num)=>{
    return (Math.round(num   *100)/100).toFixed(2)
}

export const updateCart =(state)=>{

            //calculate total item  price - use reduce method  // acc is THE RESULT of each iteration of thereduce callback function.
                                                          // so , acc is a price value. total price
            state.itemsPrice = addDecimals(state.cartItems.reduce((accPrice, item)=> accPrice+ item.price*item.qty, 0) ) // 0 is acc's default value

            //calculate shipping  price (if order is over $100, it is free, else $ 10 shipping fee)
            state.shippingPrice = addDecimals(state.itemsPrice >100? 0:10)

             //calculate tax  price: 15% tax

             state.taxPrice = addDecimals(Number((0.15* state.itemsPrice).toFixed(2)))

              //calculate total  price
              state.totalPrice =(
                Number(state.itemsPrice)+
                Number(state.shippingPrice)+
                Number(state.taxPrice)
              ).toFixed(2)

              localStorage.setItem('cart',JSON.stringify(state))

              return state


}




