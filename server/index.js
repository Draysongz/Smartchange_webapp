import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connection.js';
import auth from './Routes/Auth.js'
import userRoute from './Routes/userRoute.js'
import morgan from 'morgan'
import cookieParser from 'cookie-parser';

const app = express()
dotenv.config()
app.use(morgan('tiny'))

connectDB()
app.use(cookieParser())
app.use(express.json())

app.use('/auth', auth)
app.use('/user', userRoute)

app.use((err, req, res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success:false,
         status: errorStatus,
         message: errorMessage,
         stack: err.stack
    })
}
)
app.listen(8080, ()=>{
    console.log(`port running at 8080`)
})