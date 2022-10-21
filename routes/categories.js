const { Router } = require("express");
const { check } = require("express-validator");
const { createCat, 
        updateCat, 
        deleteCat, 
        getCatID, 
        getCat } = require("../controllers/categories");

const { validateJWT,
        validateCampos, 
        validateRole} = require("../middlewares/");

const  {isExists}  = require("../helpers/verify-categoria");

const router = Router();

//Obtener categorias - publico
router.get("/",getCat);

//Obtener categoria por id - publico
router.get("/:id",[
  check("id","No es un id valido de mongo").isMongoId(),
  check("id").custom( isExists ),
  validateCampos
],getCatID);

//Crear categoria - privado
router.post("/",
  [
    validateJWT,
    check("name","El nombre es obligatorio").not().isEmpty(),
    validateCampos
    
  ],createCat);

//Actualizar una categoria - privado
router.put("/:id",[
  validateJWT,
  check("id","No es un id valido de mongo"),
  check("id").custom(isExists),
  validateCampos
],updateCat);

//Borrar una categoria - privado(Solo si es ADMIN)
router.delete("/:id",[
  validateJWT,
  check("id","No es un id valido de mongo"),
  check("id").custom(isExists),
  validateRole,
  validateCampos
],deleteCat);



module.exports = router;