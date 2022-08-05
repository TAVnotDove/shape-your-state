import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

const RouteGuard = () => {
  const user = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" replace/>
  }

  return <Outlet />;
};

export default RouteGuard;
