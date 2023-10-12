import React from "react";
import { Navigate, Outlet } from "react-router";

const InstituteRoutes = () => {
  const isUser = JSON.parse(localStorage.getItem("user"));
  // console.log("user", isUser)
  return (
    <>
      {isUser && isUser?.isInstitute ? (
        <Outlet />
      ) : (
        <Navigate to="/access-denied" />
      )}
    </>
  );
};
export default InstituteRoutes;
