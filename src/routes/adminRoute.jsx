import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  return token && user?.data.is_admin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
