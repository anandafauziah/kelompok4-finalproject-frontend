import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components

import AdminNavbar from "../components/admin/Navbars/AdminNavbar";
import Sidebar from "../components/admin/Sidebar/Sidebar";
import HeaderStats from "../components/admin/Headers/HeaderStats";

// views

import Dashboard from "../views/admin/Dashboard";
import User from "../views/admin/User";
import Product from "../views/admin/Product";
import Order from "../views/admin/Order";
import Payment from "../views/admin/Payment";
import Profile from "../views/admin/Profile";

export default function Admin() {
  document.title = "JO'E Cape | Dashboard";
  return (
    <div className="font-rubik">
      <Sidebar />
      <div className="relative md:ml-64 bg-third min-h-screen">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/user" exact element={<User />} />
            <Route path="/product" exact element={<Product />} />
            <Route path="/order" exact element={<Order />} />
            <Route path="/payment" exact element={<Payment />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
