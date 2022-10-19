const { Router } = require("express");

const { validateJWT } = require("../middlewares/validate-jwt");


const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersNotFound} = require("../controllers/usersController");
const router = Router();



router.get("/",usersGet)

router.post("/",usersPost)

router.put("/:id",usersPut)

router.delete("/:id",[
  validateJWT,

],
usersDelete)

router.get("*",usersNotFound)


module.exports = router;