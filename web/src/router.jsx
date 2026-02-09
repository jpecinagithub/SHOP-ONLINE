import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";
import Payment from "./pages/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "catalogo", element: <Catalog /> },
      { path: "producto/:id", element: <ProductDetail /> },
      { path: "carrito", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "pago", element: <Payment /> },
      { path: "login", element: <Login /> },
      { path: "registro", element: <Register /> },
      { path: "perfil", element: <Profile /> },
      { path: "pedidos", element: <Orders /> },
      { path: "pedidos/:orderId", element: <OrderDetail /> },
      { path: "admin/pedidos", element: <AdminOrders /> },
      { path: "admin/productos", element: <AdminProducts /> },
    ],
  },
]);

export default router;
