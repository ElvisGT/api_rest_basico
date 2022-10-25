

const categories = require("./categories");
const login = require("./authController");
const products = require("./products");
const search = require("./search");
const uploads = require("./uploads");
const users = require("./usersController");


module.exports = {
  ...categories,
  ...login,
  ...products,
  ...search,
  ...uploads,
  ...users,
}