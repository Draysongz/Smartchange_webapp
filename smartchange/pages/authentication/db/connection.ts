import mongoose from 'mongoose'


const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected DB `)
    }catch(err){
        console.log(`Connection not successful`)

        throw err
    }
}


export default connectDB