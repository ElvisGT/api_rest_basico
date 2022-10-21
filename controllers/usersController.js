const { response,request } = require("express");
const bcryptjs = require("bcryptjs");

const {Usuario} = require("../models");

const usersGet = async( req = request, res = response ) => {
  const { limit = 10, desde = 0 } = req.query;
  
  // const total = await Usuario.countDocuments({state:true});

  // const usuarios = await Usuario.find({state:true}) 
  //                 .skip(desde)
  //                 .limit(limit);

  const [total,usuarios] = await Promise.all([
    Usuario.countDocuments({state:true}),
    Usuario.find({state:true})
                  .skip(desde)
                  .limit(limit)
  ]);

  res.json({
    total,
    usuarios
  });
}

const usersPost = async( req = request, res = response ) => {
  const { name, password, email, rol} = req.body;
  const usuario = new Usuario( {name, password, email, rol} );

  //Verificar el correo
  const isEmail = await Usuario.findOne({ email });
  if( isEmail ){
    return res.status(400).json({
      error:"Ese correo ya existe"
    })
  }

  //Encriptar el password
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync( password, salt);

  //Guardar en base de datos
  await usuario.save();
  
  res.json(usuario);
}

const usersPut = async( req = request, res = response ) => {
  const { id } = req.params;
  const { password, ...rest} = req.body;

  if(password){
     //Encriptar el password
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync( password, salt);
  }

  await Usuario.findByIdAndUpdate(id,rest);

  res.json({
    msg:`Usuario actualizado exitosamente`
  });
}

const usersDelete = async( req = request, res = response ) => {
  const { id } = req.params;

  //Esta forma de eliminar fisicamente no se recomienda
  // await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id,{state:false});

  const userAuth = req.userAuth;

  res.json({
    usuario,
    userAuth
  });
}

const usersNotFound = ( req = request, res = response ) => {
  res.status(404).json({
    error:`Pagina no encontrada`
  });
}


module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersNotFound
};