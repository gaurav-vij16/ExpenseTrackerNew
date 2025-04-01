import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Incomes from "./Pages/Incomes";
import ButtonClick from "./Pages/ButtonClick";
import Expenses from "./Pages/Expenses";
import Home from "./Pages/Home";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Welcome from "./Pages/Welcome";
import Footer from "./components/Footer";

// PrivateRoute Component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/welcome" />;
};

const App = () => {
  const location = useLocation();

  const hideNavbarOnRoutes = ["/", "/login", "/signup", "/welcome"];
  const hideFooterOnRoutes = ["/", "/login", "/signup", "/welcome"];
  
  const shouldShowFooter = !hideFooterOnRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/incomes" element={<PrivateRoute><Incomes /></PrivateRoute>} />
        <Route path="/addtransaction" element={<PrivateRoute><ButtonClick /></PrivateRoute>} />
        <Route path="/expenses" element={<PrivateRoute><Expenses /></PrivateRoute>} />
      </Routes>

      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default App;
