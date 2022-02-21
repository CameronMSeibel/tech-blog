const router = require("express").Router();
const blog = require("./blogRoutes");
const user = require("./userRotues");

router.use("/blog", blog);
router.use("/user", user);

module.exports = router;