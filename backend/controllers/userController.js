import asyncHandler from "express-async-handler"
import User from '../models/userModel.js'
import generateToken from "../utils/generateToken.js "




//@desc Auth use & get token
//@route POST /api/users/auth
//@access public        -bodyparser: body object => js object// res.json(): js object ==>json string & send json data(http response) to the client
const authUser =asyncHandler(async (req,res)=>{
    const {email, password }=req.body;

    const user =await User.findOne({email}) //or User.findOne({email:email})

    if(user && (await user.matchPassword(password))){
        generateToken(res,user._id)

        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            isAdmin: user.isAdmin    // token is not stored in the json together with the other data, instead, stored in cookie. It will get sent with every subsequent reqeust.
        })
    
    }else{
        res.status(401);
        throw new Error('Invalid email or password')
    }
      
})

//@desc register user
//@route POST /api/users  -- creating new resource
//@access public
const registerUser =asyncHandler(async (req,res)=>{
  const{name, email, password} = req.body;
  console.log('new user',name, email)

  const userExists = await User.findOne({email})
  
  if(userExists){
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({name,email,password})
 console.log(user.name, user.email)
  if(user){
    generateToken(res,user._id)
    console.log('here is just registered new member',token) 
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
    })
  }else{
    res.status(400)
    throw new Error('Invalid user data')
  }

     
})

//@desc logout user / clear cookie
//@route POST /api/users/logout
//@access private
const logoutUser =asyncHandler(async (req,res)=>{
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0),
       }) 
    
       res.status(200).json({message:"Logged out successfully."})   
})

//@desc get user profile
//@route GET /api/users/profile
//@access private
const getUserProfile =asyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id);  

    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc update user profile
//@route PUT /api/users/profile  -- do not use id/ will  use token
//@access private
const updateUserProfile =asyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id);  

    if(user){
       user.name = req.body.name || user.name // if nothing to update, keep previous info
       user.email = req.body.email || user.email 
     
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser =await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
   
})


//@desc GET users
//@route GET /api/users
//@access private/Admin
const getUsers =asyncHandler(async (req,res)=>{
    res.send('get users')   
})

//@desc GET user by ID
//@route GET /api/users/:id
//@access private/Admin
const getUserByID =asyncHandler(async (req,res)=>{
    res.send('get user by Id')   
})

//@desc Delete user
//@route DELETE /api/users/:id
//@access private/Admin
const deleteUser =asyncHandler(async (req,res)=>{
  
})




//@desc update user
//@route PUT /api/users/:id
//@access private/Admin
const updateUser =asyncHandler(async (req,res)=>{
    res.send('update user')   
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserByID,
    deleteUser,
    updateUser
}