const jwt = require("jsonwebtoken");
const {Usuario} = require("../models");



const validateJWT = async( req, res, next) => {
  const token = req.header('x-token');

  if(!token){
    return res.status(401).json({
      msg:"No hay token en la peticion"
    })
  }

  try {
    
    const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);

    const userAuth = await Usuario.findById(uid);

    req.userAuth = userAuth;

    next();

  } catch (error) {
    console.error(error);
    res.status(401).json({
      msg:"Token no valido"
    })
  }

}


module.exports = {
  validateJWT
}