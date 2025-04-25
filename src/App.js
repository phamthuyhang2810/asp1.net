import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Login from '././pages/admin/Login';
import ProductList from '././pages/user/ProductList';
import ProductDetail from '././pages/user/ProductDetail';
import UserHomePage from './components/Home';
import Contact from './components/Contact';
import Navbar from './components/Navbar'; // Import Navbar
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import ProductAdmin from './pages/admin/product_admin';
import CategoryAdmin from './pages/admin/Category_admin';
import UserAdmin from './pages/admin/User_admin';
import Cart from './components/Cart';
import Favorites from './components/Favorites';
import OrderAdmin from './pages/admin/Order_admin';
import LoginUser from './pages/user/Login_user';
import LogoutUser from './pages/user/Logout_user';
import OrderDetailAdmin from './pages/admin/Orderdetail_admin';
import Banner from './components/Banner';
import CheckOut from './components/CheckOut';
import CheckoutSuccess from './components/Checkoutsuccess';
import OrderDetail from './pages/admin/DetailOrder';

function App() {
  const [cartItems, setCartItems] = useState([]); // State cho giỏ hàng
  const [favoriteItems, setFavoriteItems] = useState([]); // State cho yêu thích

  const handleAddToCart = (product) => {
    setCartItems((prevCart) => [...prevCart, product]);
  };

  const handleAddToFavorites = (product) => {
    setFavoriteItems((prevFavorites) => [...prevFavorites, product]);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleRemoveFromFavorites = (id) => {
    setFavoriteItems((prevFavorites) => prevFavorites.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <Routes>
        {/* Admin */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/productadmin" element={<ProductAdmin />} />
        <Route path="/admin/categories" element={<CategoryAdmin />} />
        <Route path="/admin/users" element={<UserAdmin />} />
        <Route path="/admin/order" element={<OrderAdmin />} />
        <Route path="/admin/orders/:id" element={<OrderDetail />} /> 
        {/* User */}
        <Route path="/" element={<UserHomePage />} />
        <Route
          path="/product"
          element={
            <ProductList
              handleAddToCart={handleAddToCart}
              handleAddToFavorites={handleAddToFavorites}
            />
          }
        />
         <Route path="/product" element={<ProductList 
         handleAddToCart={handleAddToCart}
         handleAddToFavorites={handleAddToFavorites}/>} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admin/orderdetail" element={<OrderDetailAdmin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route
  path="/checkout"
  element={<CheckOut cartItems={cartItems} />}
/>
        <Route path="/footer" element={<Footer />} />
        <Route path="/loginuser" element={<LoginUser />} />
        <Route path="/logout" element={<LogoutUser />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              favoriteItems={favoriteItems}
              handleRemoveFromFavorites={handleRemoveFromFavorites}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
