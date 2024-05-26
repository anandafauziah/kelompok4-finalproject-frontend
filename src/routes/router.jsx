import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home";
import ProductPage from "../pages/product";
import DetailProductPage from "../pages/product";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
]);

export default router;
