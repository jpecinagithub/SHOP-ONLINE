const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { requireAuth } = require("../middlewares/auth");
const { validate } = require("../validators/validate");
const { adminProductSchema, adminOrderStatusSchema } = require("../validators/adminSchemas");
const { validateParams } = require("../validators/validateParams");
const { productIdParam, orderIdParam } = require("../validators/paramSchemas");

router.get("/orders", requireAuth, adminController.listOrders);
router.patch("/orders/:orderId", requireAuth, validateParams(orderIdParam), validate(adminOrderStatusSchema), adminController.updateOrderStatus);

router.get("/products", requireAuth, adminController.listProducts);
router.post("/products", requireAuth, validate(adminProductSchema), adminController.createProduct);
router.patch("/products/:productId", requireAuth, validateParams(productIdParam), validate(adminProductSchema), adminController.updateProduct);
router.delete("/products/:productId", requireAuth, validateParams(productIdParam), adminController.deleteProduct);

module.exports = router;
