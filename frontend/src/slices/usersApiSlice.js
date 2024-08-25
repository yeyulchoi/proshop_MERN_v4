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
        }),
        getUsers:builder.query({
            query:()=>({
                url:`${USERS_URL}`,               
            }),
            providesTags:['Users'],
            keepUnusedDataFor:5
        }),
        // updateUser:builder.mutation({
        //     query:(user)=>({
        //         url:`${USERS_URL}/${user._id}`,
        //         method:'PUT',
        //         body:user                
        //     }),
        //     providesTags:['Users']
        // }),
        deleteUser: builder.mutation({
            query:(id)=>({
                url:`${USERS_URL}/${id}`,
                method:'DELETE',
            })
        }),
        getUserDetails: builder.query({
            query:(id)=>({
                url:`${USERS_URL}/${id}`,  // don't forget it. this url is server side url...
                
            }),
            keepUnusedDataFor:5
        }),
        updateUserDetails: builder.mutation({
            //If error occurs, fix it to query:({data})
            query:({userData})=>({    
                
                url:`${USERS_URL}/${userData.userId}`,  // don't forget it. this url is server side url...
                method:'PUT',
                body:userData               
            }),
            invalidatesTags: ['Users'],
            keepUnusedDataFor:5  // Keeps unused data for 5 seconds before garbage collection.
        })

        
        
        
    } )
             
    

})

export const {useLoginMutation,
    useLogoutMutation, 
    useRegisterMutation,
    useProfileMutation,
    useGetUsersQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserDetailsMutation,


} = usersApiSlice
  