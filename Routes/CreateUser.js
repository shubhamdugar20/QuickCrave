const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken")
const jwtsecret=process.env.secret;
router.post("/createuser", [
  body('name').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password', 'incorrect password').isLength({ min: 5 })

]
  , async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt=await bcrypt.genSalt(10);
    let secPassword=await bcrypt.hash(req.body.password,salt);
    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        location: req.body.location



      })
      res.json({ success: true })

    } catch (error) {
      console.log(error);
      res.json({ success: false })



    }



  })


router.post("/login", async (req, res) => {
  let email = req.body.email;
  try {
    let userdata = await User.findOne({ email });
    if (!userdata) {
      return res.status(400).json({ errors: "Try logging with correct credentials" })
    }

    let valid = await bcrypt.compare(req.body.password, userdata.password);

    if(valid==false)
    {
      return res.status(400).json({ errors: "Try logging with correct credentials" })
    }
    const data={
      user:{
        id:userdata.id
      }
    }

   
    const authToken=jwt.sign(data,jwtsecret);
    
    return res.json({ success: true,authToken })
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }

})

module.exports = router;