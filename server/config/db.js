const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Database connected :${connect.connection.host}` );
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB