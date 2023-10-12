import React from "react";
import { Navigate, Outlet } from "react-router";

const PublicComponent = () => {
  const isUser = JSON.parse(localStorage.getItem("user"));
  return <>{!isUser ? <Outlet /> : <Navigate to="/access-denied" />}</>;
};
export default PublicComponent;
