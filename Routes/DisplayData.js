const express=require('express')
const router=express.Router();
router.post('/foodData',(req,res)=>{
    try{
       // console.log(global.);
       res.send([global.FOODITEM,global.FOODCAT]);
    }catch(err){
        console.log(err);
    }
})

module.exports=router;