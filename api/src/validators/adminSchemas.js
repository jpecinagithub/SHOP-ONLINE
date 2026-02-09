const { z } = require("./validate");

const adminProductSchema = z.object({
  sku: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  priceCents: z.number().int().nonnegative(),
  currency: z.string().min(3).max(3).optional(),
  stock: z.number().int().nonnegative().optional(),
  isActive: z.boolean().optional(),
});

const adminOrderStatusSchema = z.object({
  status: z.enum(["pending_payment", "paid", "shipped", "cancelled"]),
});

module.exports = { adminProductSchema, adminOrderStatusSchema };
