const express=require("express");
const router=express.Router();
const {handleBookRoom,handleRegisteredCustomers}=require("../Controllers/index")

router.get("/",(req,res)=>{
    res.render("home");
})

router.get("/registeredCustomers",handleRegisteredCustomers)

router.post("/getRoom",handleBookRoom);
module.exports=router;