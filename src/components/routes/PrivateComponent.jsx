import React from "react";
import { Navigate, Outlet } from "react-router";

const PrivateComponent = () => {
  const isUser = JSON.parse(localStorage.getItem("user"));

  return <>{isUser ? <Outlet /> : <Navigate to="/login" />}</>;
};
export default PrivateComponent;
