import express from 'express'
const router =express.Router()
import  {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUsers,
    updateUser
} from '../controllers/userController.js' 
import {protect, admin} from '../middleware/authMiddleware.js'





router.route('/').post(registerUser).get(protect,admin, getUsers)
router.post('/auth', protect,authUser )
router.post('/logout',protect,logoutUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)



router.route('/:id')
    .get(protect,admin, getUserById)
    .put(protect,admin, updateUser)
    .delete( protect,admin, deleteUsers)

export default router;