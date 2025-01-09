import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Import the Register page
import { useSelector } from "react-redux";

const App = () => {
  const { token, role } = useSelector((state) => state.auth);

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!token) return <Navigate to="/login" />;
    if (!allowedRoles.includes(role)) return <Navigate to="/" />;
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Add Register route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <h1>Admin Dashboard (Placeholder)</h1>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
