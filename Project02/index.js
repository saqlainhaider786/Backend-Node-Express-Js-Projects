const mango=require("mongoose");
const express=require("express");
const app=express();

mango.connect("mongodb://127.0.0.1:27017/medicines")
.then(()=>console.log("mongo DB is connected successfully!.."))
.catch((err)=>console.log(err));

const medicineSchema=mango.Schema({
    medicineName:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    quantity:{
        type:String,
        require:true
    },
    mfgDate:{
        type:String,
        require:true
    },
    expDate:{
        type:String,
        require:true
    }
})

const medicine=mango.model("medicine",medicineSchema);

app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.status(200).end("Hello!...");
})

app.get("/medicines",async(req,res)=>{
    res.status(200).json(await medicine.find({}));
})

app.get("/medicines/:medicineName",async(req,res)=>{
    const allMedicines=await medicine.find({});
    const reqMedi=req.params.medicineName;
    allMedicines.map((med)=>{
        if(reqMedi===med){
            return res.status(200).json(med);
        }
    })
    res.status(400).json({msg:"Medicine Not Found!...."});
})

app.post('/medicines',async(req,res)=>{
    const mediData=req.body;
    if(
        !mediData||
        !mediData.medicineName||
        !mediData.price||
        !mediData.quantity||
        !mediData.mfgDate||
        !mediData.expDate
    ){
        res.status(400).json({msg:"All fields are Required!.."})
    }

    const resut=await medicine.create({
        medicineName:mediData.medicineName,
        price:mediData.price,
        quantity:mediData.quantity,
        mnfDate:mediData.mfgDate,
        expDate:mediData.expDate
    });

    res.status(201).json({msg:`${mediData.medicineName},Added Successfully!...`})
})

app.delete("/medicines/:medicineName",async(req,res)=>{
    const mediName=req.params.medicineName;

    const allMedicines=await medicine.find({});
    let id="";
    allMedicines.map((med)=>{
        if(med.medicineName===mediName){
            id=med._id;
        }
    });

    if(id!==""){
        await medicine.findByIdAndDelete(id);
        res.status(200).json({msg:`${mediName}, Deleted Successfully!..`});
    }
    else{
        res.status(400).json({msg:`Medicine Not Found!..`});
    }
})

app.listen(7866,()=>console.log("Hosted successfully!..."));