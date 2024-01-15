const mongoose = require('mongoose');
const dotenv=require('dotenv');
const uri=process.env.uri;


const rundb= async ()=>{
await mongoose.connect(uri);


 console.log("connected");
 const fooditems=mongoose.connection.collection("FOODITEM");
 const foodcat=mongoose.connection.collection("FOODCAT");
 try{
    const data=await fooditems.find({}).toArray();
    const cat=await foodcat.find({}).toArray();
   // console.log(cat);
    global.FOODITEM=data;
    global.FOODCAT=cat;
  //console.log(global.FOODCAT);
 }catch(error)
 {
    console.log(error);
 }
}
module.exports=rundb;
