const path = require("path");
const {v4:uuidv4} = require("uuid");

const uploadFile = ( files,carpeta = '',whiteExt = ["png", "jpg", "jpeg", "gif"]) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const renameFile = file.name.split(".");
    const ext = renameFile[renameFile.length - 1];

    //Validar extensiones
    if (!whiteExt.includes(ext)) {
      return resolve(`Extension no permitida,(${whiteExt})`);
    }

    const tempName = uuidv4() + "." + ext;

    const uploadPath = path.join(__dirname, "../uploads/", carpeta, tempName);

    file.mv(uploadPath, function (err) {
      if (err) {
        return reject(err);
      }

      resolve(tempName);
    });
  });
};

module.exports = {
  uploadFile,
};
