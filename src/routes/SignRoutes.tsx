import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homeless from "../pages/Homeless";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const SignRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homeless />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
