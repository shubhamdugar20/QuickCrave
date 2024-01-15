const express = require('express')
const app = express()
const dotenv=require('dotenv');
dotenv.config();
const port = process.env.PORT;
const rundb=require('./db');
rundb();

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept" 


  );
  next();
})
app.get('/', (req, res) => {
  res.send('Hello World  i am here!')
})
app.use(express.json());
app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})