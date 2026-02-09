const router = require("express").Router();
const paymentController = require("../controllers/paymentController");
const { requireAuth } = require("../middlewares/auth");
const { validate } = require("../validators/validate");
const { paymentSchema } = require("../validators/paymentSchemas");

router.post("/pay", requireAuth, validate(paymentSchema), paymentController.pay);

module.exports = router;
