const express=require('express');
const app=new express();
const fs=require('fs');
app.use(express.json());
const data=require('./dataset.json');                                                                               
app.get('/hospital',(req,res)=>{
    res.send(data);
})
app.post('/hospital',(req,res)=>{
data.push(req.body);
fs.writeFile('dataset.json',JSON.stringify(data),(err,res)=>{
    if(err){
        res.send("Data can be written");
    }
    else{
       res.send("Data cannot be written");
    }
})
})
app.put('/hospital/:name',(req,res)=>{
    let name=req.params.name;
    data.forEach((item)=>{
        if(item.hospitalName==name){
            item.PatientsCount=req.body.PatientsCount;
            item.hospitalLocation=req.body.hospitalLocation;
        }
    })
            fs.writeFile('dataset.json',JSON.stringify(data),(err,)=>{
                if(err){
                    res.send("Data could not be updated");
                }
                else{
                    res.send("Data succesfully updated");
                }     
})
})
app.delete('/hospital/;name',(req,res)=>{
    let name=req.params.name
     
    let value=data.filter(item=> item.hospitalname !==name);
fs.writeFile('dataset.json',JSON.stringify(value),(err,res)=>{
    if(err){
        res.send("Data cannot be deleted")
    }
    else{
        res.send("Data deleted")
    }
})
})
app.listen(3000);
console.log("server listening to the port 3000");
