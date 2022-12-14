const jwt = require("jsonwebtoken");


const generateJWT = ( uid = '') => {
  return new Promise((resolve,reject) => {
    
    const payload = { uid };

    jwt.sign(payload,process.env.PRIVATE_KEY,{
      expiresIn:"250h"
    },
    (err,token) => {
      if(err){
        console.error(err);
        reject("No se ha podido generar un token");
      }else {
        resolve(token);
      }
    })

  })
}



module.exports = {
  generateJWT
}