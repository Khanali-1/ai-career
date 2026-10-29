const mongoose = require('mongoose');

// userSchema = set of rules in db 

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,

    },
    profilePhoto: {
  type: String,
  default: "",
},
targetRole: {
  type: String,
  default: "MERN Stack Developer",
},

})

// userModel wilstore the model userModle = var 

const userModel= mongoose.model("User",userSchema)

// User = name of model 

// schema = rules 

// model = wokr took for databe to save create auth login register delete

module.exports=userModel;