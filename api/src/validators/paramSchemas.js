const { z } = require("./validate");

const idParam = z.object({
  id: z.coerce.number().int().positive(),
});

const productIdParam = z.object({
  productId: z.coerce.number().int().positive(),
});

const orderIdParam = z.object({
  orderId: z.coerce.number().int().positive(),
});

module.exports = { idParam, productIdParam, orderIdParam };
