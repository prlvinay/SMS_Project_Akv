const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors");
const Joi = require('joi');
const User = require("./models/User");
const knex = require("./objection");
const globalErrorhandler = require("./errorController");
const asyncErrorHandler = require("./utils/asyncErrorHandler");
const decryptPayload = require("././helpers/decrypt");
const encryptPayload = require("./helpers/encrypt");

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());


const createUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(), 
  password: Joi.string().min(6).max(20).required()
});


const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).max(20).required()
});

const updateUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^[0-9]{10}$/),
  password: Joi.string().min(6).max(20)
});



app.post(
  "/user/create",
  decryptPayload,encryptPayload,
  asyncErrorHandler(async (req, res) => {
    const { username, email, phone, password } = req.body;
    //console.log(username + " " + email + " " + phone + " " + password);
    // if (!username || !email || !phone || !password) {
    //   throw new Error("Please Enter All Details");
    // }
    const { error } = createUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await User.query().insert({
        username,
        email,
        phone,
        password: hashedPassword,
      });
      res.status(201).json({ message: "Register success" });
      // const encryptedResponse = encryptPayload(newUser);
      // res.status(201).json({ data: encryptedResponse });
    } catch (err) {
      if (err.nativeError && err.nativeError.code === "ER_DUP_ENTRY") {
        return res
          .status(400)
          .json({ message: "Username, email, or phone already exists." });
      }
      console.error("Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

const authenticateToken = asyncErrorHandler((req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access Token Required" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }
    req.user = user;
    next();
  });
});

app.post(
  "/user/login",
  decryptPayload,encryptPayload,
  asyncErrorHandler(async (req, res) => {
    // const { error } = loginSchema.validate(req.body);
    // if (error) {
    //   return res.status(400).json({ message: error.details[0].message+" jois" });
    // }
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error("Username and password are required.");
    }
    console.log("hey " + username + " " + password);
    const user = await User.query().findOne({ username });
    if (!user) {
      throw new Error("User Not Found");
    }
    //   if (user.status !== 1) {
    //       return res.status(403).json({ message: 'User is not active. Please contact support.' });
    //   }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credintials!..");
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    // const encryptedResponse = encryptPayload(response);
    // res.status(200).json({ data: encryptedResponse })
    res.status(200).json({
      message: "Login successful.",
      token,
    });
  })
);

app.get(
  "/dashboard",
  authenticateToken,
  asyncErrorHandler(async (req, res) => {
    const userId = req.user.id;
    const user = await knex("users")
      .select(
        "id",
        "username",
        "email",
        "phone",
        "status",
        "createdAt",
        "updatedAt"
      )
      .where({ id: userId })
      .first();

    if (!user) {
      throw new Error("User Not Found");
    }
    // const encryptedResponse = encryptPayload(user);
    // res.status(200).json({ data: encryptedResponse });
    res.status(200).json(user);
  })
);
app.patch(
  "/user/update/:userId",
  asyncErrorHandler(async (req, res) => {
    const { userId } = req.params;
    const updates = req.body;
    const { error } = updateUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await User.query().findById(userId).patch(updates);
    if (!updatedUser) {
      throw new Error("User not found.");
    }

    res.status(200).json({ message: "User updated successfully." });
  })
);

app.delete(
  "/user/delete/:userId",
  asyncErrorHandler(async (req, res) => {
    const { userId } = req.params;

    const deletedRows = await User.query()
      .findById(userId)
      .patch({ status: 99 });
    if (!deletedRows) {
      throw new Error("User not found");
    }
    res.status(200).json({ message: "User deleted successfully." });
  })
);

app.get(
  "/user/all",
  asyncErrorHandler(async (req, res) => {
    const users = await User.query();
    res.status(200).json(users);
  })
);

app.use(globalErrorhandler);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const User = require("./models/User");
// const knex = require("./objection");
// const globalErrorhandler = require("./errorController");
// const asyncErrorHandler = require("./utils/asyncErrorHandler");
// const decryptPayload = require("././helpers/decrypt");

// dotenv.config();
// const app = express();

// const port = process.env.PORT || 3000;
// app.use(cors());
// app.use(express.json());

// app.post(
//   "/user/create",
//   decryptPayload,
//   asyncErrorHandler(async (req, res) => {
//     const { username, email, phone, password } = req.body;
//     //console.log(username + " " + email + " " + phone + " " + password);
//     if (!username || !email || !phone || !password) {
//       throw new Error("Please Enter All Details");
//     }
//     try {
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);
//       const newUser = await User.query().insert({
//         username,
//         email,
//         phone,
//         password: hashedPassword,
//       });
//       res.status(201).json({ message: "Register success" });
//       // const encryptedResponse = encryptPayload(newUser);
//       // res.status(201).json({ data: encryptedResponse });
//     } catch (err) {
//       if (err.nativeError && err.nativeError.code === "ER_DUP_ENTRY") {
//         return res
//           .status(400)
//           .json({ message: "Username, email, or phone already exists." });
//       }
//       console.error("Error:", err);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   })
// );

// const authenticateToken = asyncErrorHandler((req, res, next) => {
//   const token = req.headers["authorization"]?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ message: "Access Token Required" });
//   }
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid Token" });
//     }
//     req.user = user;
//     next();
//   });
// });

// app.post(
//   "/user/login",
//   decryptPayload,
//   asyncErrorHandler(async (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       throw new Error("Username and password are required.");
//     }
//     console.log("hey " + username + " " + password);
//     const user = await User.query().findOne({ username });
//     if (!user) {
//       throw new Error("User Not Found");
//     }
//     //   if (user.status !== 1) {
//     //       return res.status(403).json({ message: 'User is not active. Please contact support.' });
//     //   }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       throw new Error("Invalid Credintials!..");
//     }
//     const token = jwt.sign(
//       { id: user.id, username: user.username },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1h",
//       }
//     );
//     // const encryptedResponse = encryptPayload(response);
//     // res.status(200).json({ data: encryptedResponse })
//     res.status(200).json({
//       message: "Login successful.",
//       token,
//     });
//   })
// );

// app.get(
//   "/dashboard",
//   authenticateToken,
//   asyncErrorHandler(async (req, res) => {
//     const userId = req.user.id;
//     const user = await knex("users")
//       .select(
//         "id",
//         "username",
//         "email",
//         "phone",
//         "status",
//         "createdAt",
//         "updatedAt"
//       )
//       .where({ id: userId })
//       .first();

//     if (!user) {
//       throw new Error("User Not Found");
//     }
//     // const encryptedResponse = encryptPayload(user);
//     // res.status(200).json({ data: encryptedResponse });
//     res.status(200).json(user);
//   })
// );
// app.patch(
//   "/user/update/:userId",
//   asyncErrorHandler(async (req, res) => {
//     const { userId } = req.params;
//     const updates = req.body;

//     if (updates.password) {
//       updates.password = await bcrypt.hash(updates.password, 10);
//     }

//     const updatedUser = await User.query().findById(userId).patch(updates);
//     if (!updatedUser) {
//       throw new Error("User not found.");
//     }

//     res.status(200).json({ message: "User updated successfully." });
//   })
// );

// app.delete(
//   "/user/delete/:userId",
//   asyncErrorHandler(async (req, res) => {
//     const { userId } = req.params;

//     const deletedRows = await User.query()
//       .findById(userId)
//       .patch({ status: 99 });
//     if (!deletedRows) {
//       throw new Error("User not found");
//     }
//     res.status(200).json({ message: "User deleted successfully." });
//   })
// );

// app.get(
//   "/user/all",
//   asyncErrorHandler(async (req, res) => {
//     const users = await User.query();
//     res.status(200).json(users);
//   })
// );

// app.use(globalErrorhandler);
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
