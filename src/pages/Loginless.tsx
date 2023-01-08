import React from "react";
import { Navigate } from "react-router-dom";

export const Loginless = () => {
  return <Navigate to="/" />;
};

export default Loginless;
