const express=require("express");
const bookRoomRouter=express.Router();

bookRoomRouter.get("/getRoom",(req,res)=>{
    res.render("getRoom");
})

module.exports=bookRoomRouter;