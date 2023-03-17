import { connect } from 'mongoose';

const MONGO_URI= process.env.MONGO_URL

const connectDB = async () => {
    try {
      await connect(MONGO_URI);
      console.log('Db connected successfully');
    } catch (err) {
      console.log(err);
    }
  };


export default connectDB