

const categories = require("../controllers/categories");
const login = require("../controllers/authController");
const products = require("../controllers/products");
const search = require("../controllers/search");
const users = require("../controllers/usersController");


module.exports = {
  ...categories,
  ...login,
  ...products,
  ...search,
  ...users,
}