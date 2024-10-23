import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const PrivateRoute = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const location = useLocation();

  return authUser ? (
    <Outlet />
  ) : (
    <Navigate to={`/login?redirect=${location.pathname}`} />
  );
};

export default PrivateRoute;
