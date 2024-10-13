const mongo=require("mongoose");
const connectMongo=require("./Controllers/connectMongo");
const express=require("express");
const app=express();
const path=require("path");
const router=require("./Routes/index");
const bookRoomRouter = require("./Routes/bookRoom");
connectMongo();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set("view engine","ejs");
app.set("views",path.resolve("./Views"));

app.get("/getRoom",bookRoomRouter);
app.use("/",router);

app.listen(3000,()=>{console.log("Hosted on http://localhost:3000")});