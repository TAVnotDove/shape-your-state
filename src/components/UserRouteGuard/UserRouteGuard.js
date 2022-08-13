import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

const UserRouteGuard = () => {
  const user = useContext(UserContext);

  if (user) {
    return <Navigate to="/posts" replace/>
  }

  return <Outlet />;
};

export default UserRouteGuard;
