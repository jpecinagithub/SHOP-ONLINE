const { z } = require("./validate");

const addressSchema = z.object({
  label: z.string().min(1),
  recipientName: z.string().min(1),
  line1: z.string().min(1),
  line2: z.string().optional().nullable(),
  city: z.string().min(1),
  state: z.string().optional().nullable(),
  postalCode: z.string().min(1),
  country: z.string().min(2).max(2),
  isDefault: z.boolean().optional(),
});

const checkoutSchema = z.object({
  addressId: z.number().int().positive().optional(),
  address: addressSchema.optional(),
}).refine((data) => data.addressId || data.address, {
  message: "addressId or address required",
});

module.exports = { checkoutSchema };
