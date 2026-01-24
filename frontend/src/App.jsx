import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ProductsList from "./pages/ProductsList";
import ProductDetails from "./pages/ProductDetails";
import CategoryProducts from "./pages/CategoryProducts";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";

import AdminDashboard from "./admin/AdminDashboard";
import Products from "./admin/Products";
import Orders from "./admin/Orders";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/category/:category" element={<CategoryProducts />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/orders" element={<Orders />} />
      </Routes>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        pauseOnHover
        draggable
      />
    </BrowserRouter>
  );
}

export default App;
