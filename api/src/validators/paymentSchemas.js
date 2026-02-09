const { z } = require("./validate");

const paymentSchema = z.object({
  orderId: z.number().int().positive(),
});

module.exports = { paymentSchema };
