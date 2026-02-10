-- Seed data for local development

INSERT INTO products (sku, name, description, price_cents, currency, stock)
VALUES
  ('TSHIRT-BASIC', 'Camiseta básica', 'Algodón suave, corte regular.', 1900, 'EUR', 120),
  ('HOODIE-LITE', 'Sudadera ligera', 'Ideal para uso diario.', 3500, 'EUR', 80),
  ('BAG-URBAN', 'Bolsa urbana', 'Resistente y funcional.', 2900, 'EUR', 60),
  ('CAP-CLASSIC', 'Gorra clásica', 'Diseño ajustable con visera curva.', 1500, 'EUR', 90),
  ('JACKET-DENIM', 'Chaqueta vaquera', 'Estilo atemporal en denim resistente.', 5900, 'EUR', 40),
  ('SNEAKERS-WHITE', 'Zapatillas blancas', 'Minimalistas y cómodas para el día a día.', 7200, 'EUR', 55),
  ('BACKPACK-TRAVEL', 'Mochila de viaje', 'Gran capacidad con compartimentos internos.', 4800, 'EUR', 35),
  ('BELT-LEATHER', 'Cinturón de cuero', 'Cuero genuino con hebilla metálica.', 2300, 'EUR', 70),
  ('SWEATER-WOOL', 'Suéter de lana', 'Abrigo ligero con tacto suave.', 4100, 'EUR', 50);
