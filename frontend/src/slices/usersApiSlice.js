import {USERS_URL} from "../constants"
import {apiSlice} from "./apiSlice"



export const usersApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder)=>({           // the end point in this case is 'login'
        login:builder.mutation({                    // mutation: used when modifying data on teh server: put/post/delete request
            query: (data)=>({                       // query: used when fetching data without modifying: get request
                url:`${USERS_URL}/auth`,   // the reason for using query: fetching data from server
                method: 'POST',             // mutation: making changes to the data on the server //builder.mutation: define the endpoint that change data on the server
                body: data,
            }),
            
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}`,
                method:'POST',
                body:data,

            })
        }),
        logout: builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:'POST',
            })
        }),
        profile: builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/profile`,
                method:'PUT',
                body:data,
            })
        })
        
        
        
    } )
             
    

})

export const {useLoginMutation,
    useLogoutMutation, 
    useRegisterMutation,
    useProfileMutation} = usersApiSlice
  