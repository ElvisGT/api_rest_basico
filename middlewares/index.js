

const validateCampos = require("./validate-campos");
const validateJWT = require("./validate-jwt");
const validateRole = require('./validate-role');


module.exports = {
  ...validateCampos,
  ...validateJWT,
  ...validateRole
}