const { Router } = require("express");
const { loadFile } = require("../controllers");
const router = Router();

router.post("/",loadFile);


module.exports = router;