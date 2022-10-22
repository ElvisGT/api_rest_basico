const {request,response} = require("express");
const bcryptjs = require("bcryptjs");
const {Usuario} = require("../models");
const {generateJWT} = require("../helpers/generate-jwt");


const login = async(req = request, res = response) => {
  const {email,password} = req.body;

  //Validar correo
  const usuario = await Usuario.findOne({email});

  if(!usuario){
    return res.json({
      msg:"El correo o password no son correctos"
    })
  }

  //Validar password
  const validatorPass = bcryptjs.compareSync(password, usuario.password);

  if(!validatorPass){
    return res.json({
      msg:'El password no es correcto'
    })
  }

  //Generar token
  const token = await generateJWT( usuario._id );
  
   res.json({
    usuario,
    token
  })

 
}


module.exports = {
  login
};