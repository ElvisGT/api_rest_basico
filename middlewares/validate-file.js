

const validateFile = (req,res,next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({msg:'No hay archivos que subir.'});
    return false;
  }

  next();
}

module.exports = {
  validateFile
}