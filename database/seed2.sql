-- seed2.sql
-- Inserta 3 clientes de prueba en la tabla customers

INSERT INTO customers (
  email,
  password_hash,
  first_name,
  last_name,
  phone,
  is_active
) VALUES
(
  'juan.perez@email.com',
  '$2b$10$CwTycUXWue0Thq9StjUM0uJ8B2k6lJrVN6a8GN28AL/fOHnqd7q6K',
  'Juan',
  'Pérez',
  '+34600111222',
  1
),
(
  'ana.garcia@email.com',
  '$2b$10$CwTycUXWue0Thq9StjUM0uJ8B2k6lJrVN6a8GN28AL/fOHnqd7q6K',
  'Ana',
  'García',
  '+34600333444',
  1
),
(
  'admin@tienda.com',
  '$2b$10$CwTycUXWue0Thq9StjUM0uJ8B2k6lJrVN6a8GN28AL/fOHnqd7q6K',
  'Admin',
  'Tienda',
  NULL,
  1
);
