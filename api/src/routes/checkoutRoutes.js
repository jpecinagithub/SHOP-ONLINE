const router = require("express").Router();
const checkoutController = require("../controllers/checkoutController");
const { requireAuth } = require("../middlewares/auth");
const { validate } = require("../validators/validate");
const { checkoutSchema } = require("../validators/checkoutSchemas");

router.post("/", requireAuth, validate(checkoutSchema), checkoutController.createOrder);

module.exports = router;
