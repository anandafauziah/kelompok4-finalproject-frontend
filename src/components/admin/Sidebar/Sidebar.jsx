/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import UserDropdown from "../Dropdowns/UserDropdown";
import { FaBars, FaUsers, FaShirt, FaMoneyBill, FaReceipt, FaTableColumns, FaShirtsinbulk } from "react-icons/fa6";
import Logo from "../../Logo";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const location = useLocation();
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-first flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-third opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-first m-2 py-3 px-6")}
          >
            <FaBars />
          </button>
          {/* Brand */}
          <Link className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0 brightness-200" to="/">
            <Logo />
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={"md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " + collapseShow}
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0 brightness-200" to="/">
                    <Logo />
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button type="button" className="cursor-pointer text-third opacity-50 md:hidden px-3 py-1 text-2xl leading-none bg-transparent rounded border border-solid border-transparent" onClick={() => setCollapseShow("hidden")}>
                    &times;
                  </button>
                </div>
              </div>
            </div>
            {/* Divider */}
            <hr className="my-4 w-0 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-third text-xs uppercase font-bold block pt-1 pb-4 no-underline">Menu</h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link className={`text-xs capitalize py-3 font-semibold block text-second hover:text-third duration-700 ${location.pathname == "/admin" ? "text-third hover:text-second" : ""}`} to="/admin">
                  <div className={"flex items-center gap-x-2 text-sm"}>
                    <FaTableColumns /> Dashboard
                  </div>
                </Link>
              </li>

              <li className="items-center">
                <Link className={`text-xs capitalize py-3 font-semibold block text-second hover:text-third duration-700 ${location.pathname == "/admin/user" ? "text-third hover:text-second" : ""}`} to="/admin/user">
                  <div className={"flex items-center gap-x-2 text-sm"}>
                    <FaUsers /> Users
                  </div>
                </Link>
              </li>

              <li className="items-center">
                <Link className={`text-xs capitalize py-3 font-semibold block text-second hover:text-third duration-700 ${location.pathname == "/admin/category" ? "text-third hover:text-second" : ""}`} to="/admin/category">
                  <div className={"flex items-center gap-x-2 text-sm"}>
                    <FaShirtsinbulk /> Categories
                  </div>
                </Link>
              </li>

              <li className="items-center">
                <Link className={`text-xs capitalize py-3 font-semibold block text-second hover:text-third duration-700 ${location.pathname == "/admin/product" ? "text-third hover:text-second" : ""}`} to="/admin/product">
                  <div className={"flex items-center gap-x-2 text-sm"}>
                    <FaShirt /> Products
                  </div>
                </Link>
              </li>

              <li className="items-center">
                <Link className={`text-xs capitalize py-3 font-semibold block text-second hover:text-third duration-700 ${location.pathname == "/admin/order" ? "text-third hover:text-second" : ""}`} to="/admin/order">
                  <div className={"flex items-center gap-x-2 text-sm"}>
                    <FaReceipt /> Orders
                  </div>
                </Link>
              </li>

              <li className="items-center">
                <Link className={`text-xs capitalize py-3 font-semibold block text-second hover:text-third duration-700 ${location.pathname == "/admin/payment" ? "text-third hover:text-second" : ""}`} to="/admin/payment">
                  <div className={"flex items-center gap-x-2 text-sm"}>
                    <FaMoneyBill /> Payments
                  </div>
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
          </div>
        </div>
      </nav>
    </>
  );
}
