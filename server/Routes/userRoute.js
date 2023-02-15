import express from 'express';
import {updateUser, deleteUser, getUser, getUsers} from '../controllers/user.js'
const router = express.Router()

//update user
router.put('/update/:id', updateUser)


//delete User
router.delete('/delete/:id', deleteUser)

//Get User
router.get('/get/:id', getUser)

//Get All Users
router.get('/', getUsers)

export default router