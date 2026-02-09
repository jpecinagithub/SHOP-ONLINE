const { z } = require("./validate");

const cartAddSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

const cartUpdateSchema = z.object({
  quantity: z.number().int(),
});

module.exports = { cartAddSchema, cartUpdateSchema };
