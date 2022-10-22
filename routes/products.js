const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const {getProducts, 
      getProduct,
      createProduct,
      updateProduct,
      deleteProduct,
} = require("../controllers");
const { isProductExists } = require("../helpers/verify-product");
const { validateJWT, validateCampos, validateRole } = require("../middlewares");

//Obtener productos
router.get("/",getProducts)

//Obtener producto por id
router.get("/:id",[
  check("id","No es un id de mongo valido").isMongoId(),
  check("id").custom(isProductExists),
  validateCampos
],getProduct)

//Crear producto
router.post("/",[
  validateJWT,
  check("name","El nombre es obligatorio").not().isEmpty(),
  validateCampos
],createProduct)

//Actualizar producto
router.put("/:id",[
  validateJWT,
  check("id","No es un id de mongo valido").isMongoId(),
  check("id").custom(isProductExists),
  validateCampos
],updateProduct)

//Borrar producto
router.delete("/:id",[
  validateJWT,
  check("id","No es un id de mongo valido").isMongoId(),
  check("id").custom(isProductExists),
  validateRole,
  validateCampos,
],deleteProduct)


module.exports = router;