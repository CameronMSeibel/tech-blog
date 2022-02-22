const router = require("express").Router();
const api = require("./api");
const home = require("./homeRoutes");
const dashboard = require("./dashboardRoutes");

router.use("/api", api);
router.use("/dashboard", dashboard);
router.use("/", home);

module.exports = router;