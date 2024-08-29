const router= require("express").Router();
const{User}=require("..models//user");
const Joi =require("joi");
const bcrypt =require("bcrypt");

router.post("/",async(req,res)=>{
    try {
        const{error}=validate(req,body);
        
        if(error)
            return res.status(400).send({message:error.details[0].message});
            const user=await User.findOne({email:req.body.email});

        if(!user)
            return res.status(401).send({message:"Inavalid Email or Password"});

        const validPassword=await bcrypt.compare(
            req.body.password,user.password
        );
        if(!validPassword)
            return res.status(401).send({message:"Invalid Email or password"});

        const token=user.generateAuthToken();
            res.status(200).send({data:token,message:"Logged in successfully"});

    } catch (error) {
        res.status(500).send({message:"internal server error"});
    }
})
const validate =(data)=>{
    const Schema=Joi.object({
        email:joi.string().email().required().label("Email"),
        password:joi.string().required().label("Password")
    });
    return Schema.validate(data);
}

module.exports=router;