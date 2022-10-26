const { Router } = require("express");
const { check } = require("express-validator");
const { loadFile,updateFile,getFiles } = require("../controllers");
const { validateCampos, validateFile } = require("../middlewares");
const { validateCollection } = require("../helpers");
const router = Router();

router.post("/",loadFile);

router.put("/:coleccion/:id",[
  validateFile,
  check("id","El id no es valido de Mongo").isMongoId(),
  check("coleccion").custom(c => validateCollection(c, ['usuarios','productos'])),
  validateCampos
],updateFile);

router.get("/:coleccion/:id",[
  check("id","El id no es valido de Mongo").isMongoId(),
  check("coleccion").custom(c => validateCollection(c, ['usuarios','productos'])),
  validateCampos
],getFiles);

module.exports = router;