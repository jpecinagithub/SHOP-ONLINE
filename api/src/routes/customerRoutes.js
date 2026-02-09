const router = require("express").Router();
const customerController = require("../controllers/customerController");
const { requireAuth } = require("../middlewares/auth");
const { validateParams } = require("../validators/validateParams");
const { orderIdParam } = require("../validators/paramSchemas");

router.get("/me", requireAuth, customerController.getProfile);
router.get("/orders", requireAuth, customerController.listOrders);
router.get("/orders/:orderId", requireAuth, validateParams(orderIdParam), customerController.getOrder);

module.exports = router;
