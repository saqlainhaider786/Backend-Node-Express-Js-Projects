const fs=require("fs");
const express=require("express");
const app=express();
const myPort=7866
const data=require("./Data.json");

app.use(express.urlencoded({extended:false})); // This makes req.body useable.

app.get("/",(req,res)=>res.end("Use any command to see results.!"));
// Task 1
app.get("/users",(req,res)=>{
    const html=`
    <ol>
    ${data.map((user)=>`<li>${user.first_name} ${user.last_name}</li>`).join("")}
    </ol>
    `;

    res.send(html)
});

// Task 2
app.get("/api/users",(req,res)=>res.json(data))

// Task 3

app.get("/api/users/:userId",(req,res)=>{
    const userId=Number(req.params.userId);

    const seachingUser=data.find(user=>user.id===userId);

    res.json(seachingUser);
})

// Task 4

app.post("/api/users",(req,res)=>{
    // I have to create new user.
    const newUser=req.body;// req.body gives us all the provided data
                           // but to use it we have require middleware. line-6
    console.log("New user is : ",newUser);
    data.push({...newUser,id:data.length+1});// This will update the array, not file.
    fs.writeFile("./Data.json",JSON.stringify(data),(err)=>err&&console.log(err))
    res.json({status:"Success!.",user:newUser.first_name,id:data.length});
})

// Task 5 & 6

app.route("/api/users/:id").patch((req,res)=>{
    // Edit user with :id
    let editData=req.body;
    let editId=Number(req.params.id);
    let modifiedData=data.filter((user)=>user.id!==editId);
    modifiedData.push({...editData,id:editId})
    fs.writeFile("./Data.json",JSON.stringify(modifiedData),(err)=>err&&console.log(err))
    res.json({status:"Changed Successfully!..",id:editId});
}).delete((req,res)=>{
    let remId=Number(req.params.id);
    let updatedData=data.filter((user)=>user.id!==remId);
    fs.writeFile("./Data.json",JSON.stringify(updatedData),(err)=>err&&console.log(err))
    res.json({status:"Deleted Successfully!...",id:remId});
})

app.listen(myPort,()=>console.log(`Hosted on http://localhost:${myPort}/`));