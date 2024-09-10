const mongoose=require('mongoose');
const jwt=require("jsonwebtoken")
const joi=require('joi');
const passwordComplexity=require("joi-password-complexity");

const userSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},

});

userSchema.methods.generateAuthToken=function(){
    const token =jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY)
};

const User= mongoose.model("User",userSchema);

const validate=(data)=>{
        const Schema=joi.object({
            firstName:joi.String().required().label("First Name"),
            lastName:joi.String().required().label("Last Name"),
            email:joi.String().email().required().label("Email"),
            password:passwordComplexity().required().label("Password"),
        });
        return Schema.validate(data)
};
module.exports={User,validate};
