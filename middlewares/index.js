

const validateCampos = require("./validate-campos");
const validateJWT = require("./validate-jwt");
const validateRole = require('./validate-role');
const validateFile = require("./validate-file");


module.exports = {
  ...validateCampos,
  ...validateJWT,
  ...validateRole,
  ...validateFile
}