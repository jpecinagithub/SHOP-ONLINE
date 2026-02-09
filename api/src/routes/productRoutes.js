const router = require("express").Router();
const productController = require("../controllers/productController");
const { validateParams } = require("../validators/validateParams");
const { idParam } = require("../validators/paramSchemas");

router.get("/", productController.listProducts);
router.get("/:id", validateParams(idParam), productController.getProduct);

module.exports = router;
