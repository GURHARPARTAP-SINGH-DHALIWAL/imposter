const mongoose=require('mongoose');


const connectDB=async ()=>{
    try{
       const conn= await mongoose.connect(process.env.MONGO_URI,{
        //    options to remove some of the warnings
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        });
        console.log(`MongoDB Connected : ${conn.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);

    }   

};

module.exports=connectDB;