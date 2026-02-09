-- Seed data for local development

INSERT INTO products (sku, name, description, price_cents, currency, stock)
VALUES
  ('TSHIRT-BASIC', 'Camiseta básica', 'Algodón suave, corte regular.', 1900, 'EUR', 120),
  ('HOODIE-LITE', 'Sudadera ligera', 'Ideal para uso diario.', 3500, 'EUR', 80),
  ('BAG-URBAN', 'Bolsa urbana', 'Resistente y funcional.', 2900, 'EUR', 60);
