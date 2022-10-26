

const generateJWT = require("./generate-jwt");
const isExists = require("./verify-categoria.js");
const isProductExists = require("./verify-product.js");
const searchID = require("./search-ID");
const uploadFile = require("./upload-file");
const validateCollections = require("./validate-collection");
const findModel = require("./find-model");


module.exports = {
  ...findModel,
  ...generateJWT,
  ...isExists,
  ...isProductExists,
  ...searchID,
  ...uploadFile,
  ...validateCollections
}