import React from "react";

// components

import AdminNavbar from "../components/admin/Navbars/AdminNavbar";
import Sidebar from "../components/admin/Sidebar/Sidebar";
import HeaderStats from "../components/admin/Headers/HeaderStats";

const Admin = (props) => {
  document.title = "JO'E Cape | Dashboard";
  const { children } = props;
  return (
    <div className="font-rubik">
      <Sidebar />
      <div className="relative md:ml-64 bg-third min-h-screen">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">{children}</div>
      </div>
    </div>
  );
};

export default Admin;
