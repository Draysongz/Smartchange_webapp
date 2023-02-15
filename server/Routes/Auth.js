import express from 'express';
import {register, login} from '../controllers/auth.js'






const router = express.Router()

//Sign up API
router.post('/register', register)

//Log in API
router.get('/login', login)


export default router