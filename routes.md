Front (base)

http://localhost:5173

Health

GET http://localhost:3001/health

Auth
2. POST http://localhost:3001/auth/register
3. POST http://localhost:3001/auth/login
4. POST http://localhost:3001/auth/refresh
5. POST http://localhost:3001/auth/logout

Productos
6. GET http://localhost:3001/products
7. GET http://localhost:3001/products/:id

Carrito
8. GET http://localhost:3001/cart
9. POST http://localhost:3001/cart/items
10. PATCH http://localhost:3001/cart/items/:productId
11. DELETE http://localhost:3001/cart/items/:productId

Checkout
12. POST http://localhost:3001/checkout

Pago
13. POST http://localhost:3001/payment/pay

Clientes
14. GET http://localhost:3001/customers/me
15. GET http://localhost:3001/customers/orders
16. GET http://localhost:3001/customers/orders/:orderId

Admin
17. GET http://localhost:3001/admin/orders
18. PATCH http://localhost:3001/admin/orders/:orderId
19. GET http://localhost:3001/admin/products
20. POST http://localhost:3001/admin/products
21. PATCH http://localhost:3001/admin/products/:productId
22. DELETE http://localhost:3001/admin/products/:productId


