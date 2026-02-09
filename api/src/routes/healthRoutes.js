const { getHealth } = require("../controllers/healthController");

const router = require("express").Router();

router.get("/", getHealth);

module.exports = router;
