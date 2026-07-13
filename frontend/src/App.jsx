import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Cart = lazy(() => import("./pages/Cart"));
const ProductsList = lazy(() => import("./pages/ProductsList"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const CategoryProducts = lazy(() => import("./pages/CategoryProducts"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Payment = lazy(() => import("./pages/Payment"));
const Profile = lazy(() => import("./pages/Profile"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const AdminRegister = lazy(() => import("./admin/AdminRegister"));
const AdminLogin = lazy(() => import("./admin/AdminLogin"));
const Products = lazy(() => import("./admin/Products"));
const Orders = lazy(() => import("./admin/Orders"));

const Loader = () => (
  <div className="h-screen flex items-center justify-center text-xl font-semibold animate-pulse dark:text-gray-200">
    Loading...
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
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
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} newestOnTop pauseOnHover draggable />
    </BrowserRouter>
  );
}

export default App;
