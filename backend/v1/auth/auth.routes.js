const express = require("express");
const router = express.Router();
const { register, login } = require("./auth.controller");
const authenticated = require("../../helpers/authenticated");

router.post("/register", register);

router.post("/login", login);

// router.get('/user', authenticated,(req,res)=>{
//   return res.status(200).json({
//     message:'getting user'
//   })
// })
// router.get('/logout',(req,res)=>{
//   res.clearCookie('access_token')
//   return res.status(200).json({
//     message:'logout ......'
//   })
// })

module.exports = router;
