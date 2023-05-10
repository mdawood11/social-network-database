const router = require("express").Router();
const thoughtRoutes = require("./thougth-routes");
const userRoutes = require("./user-routes");

router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);

module.exports = router;
