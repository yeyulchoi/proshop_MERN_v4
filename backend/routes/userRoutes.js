import express from 'express'
const router =express.Router()
import  {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserByID,
    deleteUser,
    updateUser
} from '../controllers/userController.js' 
import {protect, admin} from '../middleware/authMiddleware.js'





router.route('/').post(registerUser).get(protect,admin, getUsers)
router.post('/auth', protect,authUser )
router.post('/logout',protect,logoutUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)



router.route('/:id')
    .get(protect,admin, getUserByID)
    .put(protect,admin, updateUser)
    .delete( protect,admin, deleteUser)

export default router;