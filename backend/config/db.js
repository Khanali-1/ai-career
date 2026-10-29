const mongoose = require("mongoose");

const connectDB = async ()=>{
    try{
        await mongoose.connect ('mongodb://localhost:27017/ai_career');
        console.log(" mongodb connected successfully")
    }
    catch(error){
        console.log("mongodb connection failed")
    }
}

module.exports=connectDB;