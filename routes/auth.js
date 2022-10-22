const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers");
const { validateCampos} = require('../middlewares/');

const router = Router();

router.post("/login",[
  check('email','El email es obligatorio').isEmail(),
  check('password','El password es obligatorio').not().isEmpty(),
  check('password','El password debe tener al menos 6 caracteres').isLength({min:6}),
  validateCampos
],login);



module.exports = router;