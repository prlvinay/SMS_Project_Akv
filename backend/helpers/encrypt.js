const crypto = require("crypto-js");
const dotenv = require("dotenv");
dotenv.config();

function encryptData(data) {
  return crypto.AES.encrypt(JSON.stringify(data),process.env.ENCRYPTION_KEY).toString();
  
}
//const encryptionKey ="AkriviaHCM";  


// const encryptPayload = (req, res, next) => {
//   // res.encryptAnd
//   // const originalSend = res.send;
//   // console.log("last"+res.send);
//   // res.send = (body) => {
//   //   const encryptedBody = crypto.AES.encrypt(JSON.stringify(body), encryptionKey).toString();
//   //   console.log("last"+JSON.stringify({ data: encryptedBody }));
//   //   return originalSend.call(res, JSON.stringify({ data: encryptedBody }));
//   // };
//   res.json=(body)=>{
//     try{
//       const encryptedbody=encryptData(body)
//     console.log("here back"+encryptedbody);
//     return res.json.call(res,{data:encryptedbody})
//     }
//     catch(error){
//       console.error('Encryption error',error);
//       return res.status(500).json({error:'Data Encryption Failed'});
//     }
//   }
//   next();
// };
const encryptPayload = (req, res, next) => {
  const originalJson = res.json;

  res.json = (body) => {
    try {
      const encryptedBody = encryptData(body);
      console.log("Encrypted data: ", encryptedBody);
      
      // Call the original res.json function with the encrypted data
      return originalJson.call(res, { data: encryptedBody });
    } catch (error) {
      console.error('Encryption error', error);
      return res.status(500).json({ error: 'Data Encryption Failed' });
    }
  };

  // Proceed with the next middleware or route handler
  next();
};

module.exports = encryptPayload;

