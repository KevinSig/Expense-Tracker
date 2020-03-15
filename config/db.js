const mongoose =require('mongoose');

//creating the connection to our db

const connectDB = async () => { 
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{

            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true

        });
        console.log(`mongo db connected: ${conn.connection.host}`.cyan.underline.bold)

    }catch(err){
        console.log(`error ${err.message}`.red)
        process.exit(1)
    }
}

module.exports = connectDB 