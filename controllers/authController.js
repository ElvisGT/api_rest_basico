const {request,response} = require("express");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const Usuario = require("../models/usuario");


const login = async(req = request, res = response) => {
  const {email,password} = req.body;
  const errors = validationResult(req);

  if(!errors.isEmpty()){
     res.json({
      msg:errors
    })
  }

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
  
   res.json({
    email,
    password
  })

 
}


module.exports = {
  login
};