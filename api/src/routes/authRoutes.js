const router = require("express").Router();
const authController = require("../controllers/authController");
const { validate } = require("../validators/validate");
const { registerSchema, loginSchema, refreshSchema, logoutSchema } = require("../validators/authSchemas");
const { authLimiter } = require("../middlewares/rateLimit");

router.post("/register", authLimiter, validate(registerSchema), authController.register);
router.post("/login", authLimiter, validate(loginSchema), authController.login);
router.post("/refresh", authLimiter, validate(refreshSchema), authController.refresh);
router.post("/logout", authLimiter, validate(logoutSchema), authController.logout);

module.exports = router;
