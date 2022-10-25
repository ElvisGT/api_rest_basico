

const generateJWT = require("./generate-jwt");
const isExists = require("./verify-categoria.js");
const isProductExists = require("./verify-product.js");
const searchID = require("./search-ID");
const uploadFile = require("./upload-file");

module.exports = {
  ...generateJWT,
  ...isExists,
  ...isProductExists,
  ...searchID,
  ...uploadFile
}