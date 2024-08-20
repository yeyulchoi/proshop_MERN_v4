//we need to verify token
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

//protect routes
 const protect =asyncHandler(async(req, res, next)=>{
    let token;

    //Read the JWT from the cookie
    token = req.cookies.jwt;

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);  // the decoded object has userId (payload that was used when creating token)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            console.error('Token verification failed:', error);
         res.status(401)
         throw new Error('Not authorized, token failed');   
         
        }

    }else{
        res.status(401)
        throw new Error('Not authorized, no token');

    }
})


//Admin middleware
const admin = (req, res, next)=>{
    if(req.user && req.user.isAdmin){ 
        next();
    }else{
        res.status(401);
        throw new Error('Not authorized as admin');
    }
}

export {protect, admin}