import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Loginless from "../pages/Loginless";

export const ProtectRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Loginless />} />
      </Routes>
    </BrowserRouter>
  );
};
