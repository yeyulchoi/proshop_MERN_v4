import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'

const baseQuery =fetchBaseQuery({baseUrl:BASE_URL})  //This baseUrl serves as the root URL for all API requests made through this API slice.

export const apiSlice =createApi({
    baseQuery,   // '/'
    tagTypes:['Product','Order','User'],
    endpoints:(builder)=>({})
})