const mongo=require("mongoose");
const data=require("../Models/customers");

const handleRegisteredCustomers=async(req,res)=>{
    const allCustomers=await data.find({});
    res.render("customersList",{
        bookedRooms:allCustomers
    })
}

const handleBookRoom=async(req,res)=>{

    const newCustomerData=req.body;

    if(!newCustomerData ||
        !newCustomerData.custName||
        !newCustomerData.custEmail||
        !newCustomerData.custRoomNo||
        !newCustomerData.roomSeater
    ){
        res.status(400).json("All fields followed with (*) are required!..");
    }
    else{
        let phno="";
        if(newCustomerData.custPhno){
            phno=newCustomerData.custPhno;
        }
        await data.create({
            custName:newCustomerData.custName,
            custEmail:newCustomerData.custEmail,
            custRoomNo:newCustomerData.custRoomNo,
            roomSeater:newCustomerData.roomSeater,
            custPhno:phno
        });

        res.status(201).send("Successfully Entered New Customer's Data!..")
    }
}

module.exports={handleBookRoom,handleRegisteredCustomers};