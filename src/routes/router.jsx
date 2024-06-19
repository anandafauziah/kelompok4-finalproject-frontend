import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home";
import ProductPage from "../pages/product";
import DetailProductPage from "../pages/detailProduct";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserPayment from "../pages/Payment";
import Cart from "../pages/cart";
import Admin from "../pages/admin";
import UserProfile from "../pages/profile";
import PrivateRoute from "./privateRoute";
import Dashboard from "../views/admin/Dashboard";
import User from "../views/admin/User";
import AdminRoute from "./adminRoute";
import Payment from "../views/admin/Payment";
import Product from "../views/admin/Product";
import Order from "../views/admin/Order";
import Profile from "../views/admin/Profile";
import UserOrder from "../pages/userOrder";

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
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <Cart />,
      },
    ],
  },
  {
    path: "/profile",
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/order",
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <UserOrder />,
      },
    ],
  },
  {
    path: "/checkout",
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <UserPayment />,
      },
    ],
  },
  {
    path: "/admin/",
    element: <AdminRoute />,
    children: [
      {
        path: "",
        element: (
          <Admin>
            <Dashboard />
          </Admin>
        ),
      },
      {
        path: "profile",
        element: (
          <Admin>
            <Profile />
          </Admin>
        ),
      },
      {
        path: "user",
        element: (
          <Admin>
            <User />
          </Admin>
        ),
      },
      {
        path: "product",
        element: (
          <Admin>
            <Product />
          </Admin>
        ),
      },
      {
        path: "order",
        element: (
          <Admin>
            <Order />
          </Admin>
        ),
      },
      {
        path: "payment",
        element: (
          <Admin>
            <Payment />
          </Admin>
        ),
      },
    ],
  },
]);

export default router;
