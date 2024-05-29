import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home";
import ProductPage from "../pages/product";
import DetailProductPage from "../pages/detailProduct";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Payment from "../pages/Payment";
import Cart from "../pages/cart";
import Admin from "../pages/admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/product",
    element: <ProductPage />,
  },
  {
    path: "/product/:slug",
    element: <DetailProductPage />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/admin/*",
    element: <Admin />,
  },
]);

export default router;
