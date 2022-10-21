const { Router } = require("express");

const { validateRole,
        validateJWT } = require("../middlewares/");


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
  validateRole,

],
usersDelete)

router.get("*",usersNotFound)


module.exports = router;