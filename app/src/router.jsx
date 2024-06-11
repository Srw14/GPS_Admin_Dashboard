import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./pages/login";
import Forgot from "./pages/forgot";
import Home from "./pages/home";
import Employee from "./pages/employee";
import Customer from "./pages/customer";
import Products from "./pages/products";
import Aguitar from "./pages/aguitar";
import Eguitar from "./pages/eguitar";
import Bguitar from "./pages/bguitar";
import Order from "./pages/order";
import Aorder from "./pages/aorder";
import Corder from "./pages/corder";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/home" element={<Home />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/products" element={<Products />} />
      <Route path="/bguitar" element={<Bguitar />} />
      <Route path="/eguitar" element={<Eguitar />} />
      <Route path="/aguitar" element={<Aguitar />} />
      <Route path="/order" element={<Order />} />
      <Route path="/aorder" element={<Aorder />} />
      <Route path="/corder" element={<Corder />} />
    </>
  )
);

export default router;
