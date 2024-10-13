const mongo=require("mongoose");

const customerSchema=mongo.Schema({
    custName:{
        type:String,
        required:true
    },
    custEmail:{
        type:String,
        required:true,
        unique:true
    },
    custPhno:{
        type:String
    },
    custRoomNo:{
        type:Number,
        required:true
    },
    roomSeater:{
        type:String,
        required:true
    }
});

const customer=mongo.model("customer",customerSchema);

module.exports=customer;