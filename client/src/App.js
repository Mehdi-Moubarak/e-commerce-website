import React from "react";
//import "./App.css";
import "./AdminApp.css";
import AppLayout from "./layouts/AppLayout";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import { ROUTES } from "./utils/constants";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard.js";
import Category from "./pages/Dashboard/Category.js";
import Comment from "./pages/Dashboard/Comment.js";
import ProductList from "./pages/Dashboard/ProductList.js";
import ProductView from "./pages/Dashboard/ProductView.js";
import ProductUpdate from "./pages/Dashboard/ProductUpdate.js";
import ProductCreate from "./pages/Dashboard/ProductCreate.js";
import Order from "./pages/Dashboard/Order.js";
import Profile from "./pages/Dashboard/Profile.js";
import Discount from "./pages/Dashboard/Discount.js";
import DiscountCreate from "./pages/Dashboard/DiscountCreate.js";
import OrderDetail from "./pages/Dashboard/OrderDetail.js";
import OrderView from "./pages/Dashboard/OrderView.js";
import CommentView from "./pages/Dashboard/CommentView.js";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Services from "./pages/Services";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/Signup";
import { AuthProvider } from "./context/authContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route path={ROUTES.dashboard} element={<Dashboard />} />
            
            <Route path={ROUTES.category} element={<Category />} />

            <Route path={ROUTES.comment} element={<Comment />} />
            <Route path={ROUTES.commentView} element={<CommentView />} />

            <Route path={ROUTES.order} element={<Order />} />
            <Route path={ROUTES.orderDetail} element={<OrderDetail />} />
            <Route path={ROUTES.orderView} element={<OrderView />} />

            <Route path={ROUTES.productList} element={<ProductList />} />
            <Route path={ROUTES.productView} element={<ProductView />} />
            <Route path={ROUTES.productUpdate} element={<ProductUpdate />} />
            <Route path={ROUTES.productCreate} element={<ProductCreate />} />

            <Route path={ROUTES.profile} element={<Profile />} />

            <Route path={ROUTES.discount} element={<Discount />} />
            <Route path={ROUTES.discountCreate} element={<DiscountCreate />} />
          </Route>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path={ROUTES.contact} element={<Contact />} />
            <Route path={ROUTES.about} element={<About />} />
            <Route path={ROUTES.shop} element={<Shop />} />
            <Route path={ROUTES.services} element={<Services />} />
            <Route path={ROUTES.cart} element={<Cart />} />
            <Route path={ROUTES.checkout} element={<Checkout />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route
              path={ROUTES.login}
              element={
                <Login
                  image="images/img-bg-1.jpg"
                  title="Login"
                  caption="Please enter your login details to sign in."
                />
              }
            />
            <Route
              path={ROUTES.signup}
              element={
                <SignUp
                  image="images/img-bg-2.jpg"
                  title="Sign up"
                  caption="Create your account in seconds."
                />
              }
            />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
