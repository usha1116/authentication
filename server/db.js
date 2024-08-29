const mongoose =require("mongoose");

module.exports=()=>{
    const connectionParams={
        useNewUrlParser:true,
        useUnifieldTopology:true,
    };
    try {
        mongoose.connect(process.env.DB,connectionParams);
        console.log("connected to datbase successsfully");
    } catch (error) {
        console.log(error);
        console.log("could not connect to database!");
    }
};