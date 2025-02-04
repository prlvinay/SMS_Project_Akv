// const crypto = require("crypto-js");
// module.exports= function decryptPayload(encryptedData) {
//   const bytes = crypto.AES.decrypt(encryptedData, process.env.ENCRYPTION_KEY);
//   return JSON.parse(bytes.toString(crypto.enc.Utf8));
// }

const crypto = require("crypto-js");
const dotenv = require("dotenv");
dotenv.config();

const encryptionKey = "AkriviaHCM"; 


const decryptPayload = (req, res, next) => {
  console.log("came here");
  if (req.body.data) {
    try {
      const bytes = crypto.AES.decrypt(req.body.data, encryptionKey);
      const decryptedData = bytes.toString(crypto.enc.Utf8);
      console.log("Decrypted Data "+decryptedData);
      req.body = JSON.parse(decryptedData);
    } catch (err) {
      return res.status(400).json({ message: "Failed to decrypt request body." });
    }
  }
  next();
};

module.exports = decryptPayload;
