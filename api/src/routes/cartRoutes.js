const router = require("express").Router();
const cartController = require("../controllers/cartController");
const { requireAuth } = require("../middlewares/auth");
const { validate } = require("../validators/validate");
const { cartAddSchema, cartUpdateSchema } = require("../validators/cartSchemas");
const { validateParams } = require("../validators/validateParams");
const { productIdParam } = require("../validators/paramSchemas");

router.get("/", requireAuth, cartController.getCart);
router.post("/items", requireAuth, validate(cartAddSchema), cartController.addItem);
router.patch("/items/:productId", requireAuth, validateParams(productIdParam), validate(cartUpdateSchema), cartController.updateItem);
router.delete("/items/:productId", requireAuth, validateParams(productIdParam), cartController.removeItem);

module.exports = router;
