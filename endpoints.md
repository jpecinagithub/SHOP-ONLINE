Health

GET /health
Auth
2. POST /auth/register
3. POST /auth/login
4. POST /auth/refresh
5. POST /auth/logout

Productos
6. GET /products
7. GET /products/:id

Carrito
8. GET /cart
9. POST /cart/items
10. PATCH /cart/items/:productId
11. DELETE /cart/items/:productId

Checkout
12. POST /checkout

Pago
13. POST /payment/pay

Clientes
14. GET /customers/me
15. GET /customers/orders
16. GET /customers/orders/:orderId

Admin
17. GET /admin/orders
18. PATCH /admin/orders/:orderId
19. GET /admin/products
20. POST /admin/products
21. PATCH /admin/products/:productId
22. DELETE /admin/products/:productId