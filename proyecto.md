# Proyecto Tienda Online

## Objetivo general
Desarrollar una **web app de tienda online** lo más **sencilla, estable y mantenible posible**, evitando sobre‑ingeniería y reduciendo al mínimo las fuentes de error.

**Stack definido**
- Frontend: Vite + React (CSS plano, sin Tailwind ni frameworks UI)
- Backend: Node.js + Express
- Base de datos: MySQL
- Autenticación: JWT (access + refresh tokens)

Reglas clave:
- Código claro y predecible
- Archivos pequeños (ideal <120 líneas)
- Separación de responsabilidades
- Flujo completo de compra: catálogo → carrito → checkout → pago → pedido

---

## Documento de hitos del proyecto

### Hito 0 — Kickoff y estructura base
- Crear dos proyectos separados: `web/` y `api/`
- Configurar variables de entorno
- Scripts básicos: dev / build / start

Resultado esperado:
- Frontend y backend arrancan en local sin fricción

---

### Hito 1 — UI base simple (CSS plano)
- Layout básico: Header, Footer, contenedor central
- CSS global (reset, variables, layout)
- Navegación funcional

Resultado esperado:
- App usable en móvil y desktop, diseño limpio

---

### Hito 2 — Base de datos MySQL
- Tablas principales:
  - customers
  - products
  - orders
  - order_items
  - carts / cart_items
  - addresses
  - tablas de autenticación (refresh, reset, verify)
- Claves foráneas e índices

Resultado esperado:
- `schema.sql` ejecuta sin errores en MySQL 8+

---

### Hito 3 — Backend Express mínimo
- Estructura por capas (routes, controllers, services)
- Middlewares básicos: cors, helmet, error handler
- Endpoint /health

Resultado esperado:
- API estable con manejo de errores consistente

---

### Hito 4 — Autenticación JWT robusta
- Registro y login con bcrypt
- Access token corto + refresh token largo
- Refresh tokens almacenados y revocables

Endpoints:
- POST /auth/register
- POST /auth/login
- POST /auth/refresh
- POST /auth/logout

Resultado esperado:
- Sesiones seguras y controladas

---

### Hito 5 — Productos (catálogo)
- Listado de productos
- Detalle de producto
- CRUD básico (admin, opcional al inicio)

Resultado esperado:
- Catálogo navegable sin errores

---

### Hito 6 — Carrito
- Carrito persistente por usuario
- Añadir, quitar y modificar cantidades

Resultado esperado:
- Subtotal correcto y estado consistente

---

### Hito 7 — Checkout sencillo
- Selección/creación de dirección
- Resumen del pedido
- Creación de orden en estado pending_payment

Resultado esperado:
- Pedido creado correctamente desde carrito

---

### Hito 8 — Pago (modo simple)
- Pago simulado inicialmente
- Cambio de estado de orden a paid

Resultado esperado:
- Flujo de compra completo sin dependencias externas

---

### Hito 9 — Área cliente
- Perfil básico
- Historial de pedidos
- Detalle de pedido

Resultado esperado:
- Usuario puede consultar sus compras

---

### Hito 10 — Admin mínimo
- Gestión de productos
- Gestión de pedidos

Resultado esperado:
- Administración funcional sin complejidad

---

### Hito 11 — Hardening final
- Validación de inputs
- Rate limit en auth
- Tests mínimos (auth + checkout)

Resultado esperado:
- Proyecto estable y listo para producción

---

### Hito 12 — Deploy
No hemos hecho el Deploy, la tienda esta para ser usada localmente.

---

## Estructura de carpetas del proyecto

### Raíz
```
tienda-online/
├── web/
├── api/
├── database/
├── docker-compose.yml
└── README.md
```

---

### Frontend — web/
```
web/
├── public/
│   └── images/products/
├── src/
│   ├── components/
│   ├── layout/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── router.jsx
├── index.html
└── vite.config.js
```

---

### Backend — api/
```
api/
├── src/
│   ├── config/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── middlewares/
│   ├── validators/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── package.json
└── .env.example
```

---

### Base de datos — database/
```
database/
├── schema.sql
├── seed.sql
└── README.md
```

---

## Cierre
Este documento define **todo el proyecto de principio a fin** con foco en simplicidad, estabilidad y aprendizaje sólido. Cada hito puede desarrollarse y validarse de forma independiente antes de avanzar al siguiente.
