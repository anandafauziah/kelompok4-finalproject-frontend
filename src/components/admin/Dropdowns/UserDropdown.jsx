import React, { useState } from "react";

import { FaPowerOff, FaUser } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../slices/authSlice";
import { useNavigate } from "react-router";
import axios from "axios";

const UserDropdown = () => {
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    setLogoutLoading(true);
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.post(`${backendURL}/auth/logout`).then((response) => {
      dispatch(logout());
      alert(response.data.message);
      setLogoutLoading(false);
      navigate("/");
    });
  };

  return (
    <>
      {logoutLoading && (
        <div className="fixed top-24 left-5 md:left-3/4 z-[99999]">
          <span className="loading loading-spinner loading-lg md:loading-lg text-first"></span>
        </div>
      )}
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <a href="/admin/profile">
              <FaUser />
              Profile
            </a>
          </li>
          <li>
            <button
              onClick={() => {
                if (confirm("Logout?")) handleLogout();
              }}
            >
              <FaPowerOff />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserDropdown;
