// const jwt=require('jsonwebtoken')
// require('dotenv').config()
// const authenticated= async (req,res,next)=>{
//   const token=await req.cookies.access_token;
//   if(!token) return res.status(401).json({
//     message:'you need to login first'
//   })
//   jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
//     if(err){
//       console.error('error ',err)
//       return res.status(401).json({
//         message:'you need to login first'
//       })
//     }
//     req.user=decoded
//     next()
//   })
// }
// module.exports=authenticated;

// app.post("/encrypt", (req, res) => {
//   const { data } = req.body;
//   const en = encryptPayload(data);
//   res.json({ en });
// });

// app.post("/decrypt", (req, res) => {
//   const { en } = req.body;
//   const de = decryptPayload(en);
//   res.json({ de });
// });







// const express = require('express')
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// const cors=require('cors');
// const User = require('./models/User');
// const knex = require('./objection');
// const globalErrorhandler = require('./errorController');
// const asyncErrorHandler = require('./utils/asyncErrorHandler');

// dotenv.config();
// const app = express();

// const port = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());

// app.post('/user/create',asyncErrorHandler( async (req, res) => {
//   const { username, email, phone, password } = req.body;
//   if (!username || !email || !phone || !password) {
//       throw new Error("Please Enter All Details");
//   }
//   try{
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);
//       const newUser = await User.query().insert({
//         username,
//         email,
//         phone,
//         password: hashedPassword,
//       });
//       res.status(201).json(newUser);
//     }
//   catch (err) {
//     if (err.nativeError && err.nativeError.code === 'ER_DUP_ENTRY') {
//         return res.status(400).json({ message: 'Username, email, or phone already exists.' });
//       }
//       console.error('Error:', err);
//       //res.status(500).json({ message: "Internal Server Error" });
//       //throw new Error("Internal Server Error");
// }
// }
// ));

// const authenticateToken =asyncErrorHandler( (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1];
//     if (!token){
//       return res.status(401).json({ message: "Access Token Required" });
//     }
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err){
//         return res.status(403).json({ message: "Invalid Token" });
//     }
//       req.user = user;
//       next();
//     });
//   });

// app.post('/user/login',asyncErrorHandler( async (req, res) => {
//   const { username, password } = req.body;
//     if (!username || !password) {
//     throw new Error("Username and password are required.");
//     }

//   const user = await User.query().findOne({ username });
//   if (!user) {
//     throw new Error("User Not Found");
//   }
//     //   if (user.status !== 1) {
//     //       return res.status(403).json({ message: 'User is not active. Please contact support.' });
//     //   }
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         throw new Error("Invalid Credintials!..");
//       }
//       const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
//           expiresIn: '1h',
//       });
//       res.status(200).json({
//           message: 'Login successful.',
//           token,
//       });

// }));

// app.get('/dashboard', authenticateToken,asyncErrorHandler( async (req, res) => {
//     const userId = req.user.id;
//     const user = await knex('users')
//       .select('id', 'username', 'email', 'phone', 'status', 'createdAt', 'updatedAt')
//       .where({ id: userId })
//       .first();

//       if (!user) {
//         throw new Error("User Not Found");
//       }
//       res.status(200).json(user);
//   }));

//   app.patch('/user/update/:userId',asyncErrorHandler( async (req, res) => {
//       const { userId } = req.params;
//       const updates = req.body;

//       if (updates.password) {
//         updates.password = await bcrypt.hash(updates.password, 10);
//       }

//       const updatedUser = await User.query().findById(userId).patch(updates);
//       if (!updatedUser) {
//         throw new Error("User not found.");
//       }

//       res.status(200).json({ message: 'User updated successfully.' });
//   }));

//   app.delete('/user/delete/:userId',asyncErrorHandler( async (req, res) => {
//       const { userId } = req.params;

//       const deletedRows = await User.query().findById(userId).patch({ status: 99 });
//       if (!deletedRows) {
//         throw new Error("User not found");
//       }
//       res.status(200).json({ message: 'User deleted successfully.' });
//   }));

//   app.get('/user/all',asyncErrorHandler( async (req, res) => {
//       const users = await User.query();
//       res.status(200).json(users);
//   }));

//   app.use(globalErrorhandler);
//   app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
//   });

// //   app.all('*',(req,res,next)=>{
// //     // const err=new Error(`Can't find the requested Route on the server`);
// //     // err.status='fail';
// //     // err.statusCode=404;
// //     // next(err);
// //     return next(new AppError('Sarriga vetakara ra babu.', 404));
// //   })

// //   app.use(globalErrorhandler);

// //   class AppError extends Error {
// //     constructor(message, statusCode) {
// //       super(message);
// //       this.statusCode = statusCode;
// //       this.isOperational = true;
// //       this.status=statusCode>=400 && statusCode<500?'fail':'error';
// //       Error.captureStackTrace(this, this.constructor);
// //     }
// //   }
