const { response,request } = require("express");

const usersGet = ( req = request, res = response ) => {
  const { nombre,q } = req.query;
  res.json({
    msg:"get-API",
    nombre,
    q
  });
}

const usersPost = ( req = request, res = response ) => {
  const body = req.body;
  res.json(body);
}

const usersPut = ( req = request, res = response ) => {
  const { id } = req.params;

  res.json({
    msg:`Usuario con id ${id} actualizado`
  });
}

const usersDelete = ( req = request, res = response ) => {
  const { id } = req.params;
  
  res.json({
    msg:`Usuario con id ${id} eliminado`
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