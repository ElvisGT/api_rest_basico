

const validateRole = async( req, res, next) => {

  if(req.userAuth.rol !== 'ADMIN_ROLE'){
    return res.status(401).json({
      msg:"No tiene permisos suficientes"
    })
  }

  next();
}



module.exports = {
  validateRole
}