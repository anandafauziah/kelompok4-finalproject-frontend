import { FaRightFromBracket, FaUserPlus } from "react-icons/fa6";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.post("http://localhost:8000/api/auth/logout").then((response) => {
      dispatch(logout());
      alert(response.data.message);
      navigate("/");
    });
  };

  return (
    <div className="navbar px-10 md:px-16 pt-4">
      <a href="/" className="scale-150 md:scale-100">
        <Logo />
      </a>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ms-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] shadow bg-base-100 rounded-box">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/product">Products</a>
          </li>
          <li>
            <a>Category</a>
            <ul className="p-2">
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </li>
          {/* <li>
            <a>Contact</a>
          </li> */}
        </ul>
      </div>
      <div className="navbar hidden lg:flex lg:justify-center">
        <ul className="menu menu-horizontal">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/product">Product</a>
          </li>
          <li>
            <details>
              <summary>Category</summary>
              <ul className="px-3">
                <li>
                  <a>Jaket</a>
                </li>
                <li>
                  <a>Sepatu</a>
                </li>
              </ul>
            </details>
          </li>
          {/* <li>
            <a>Contact</a>
          </li> */}
        </ul>
      </div>
      <div className="flex-none gap-x-1">
        <div className="dropdown dropdown-end me-3">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <button className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-44 md:w-64 bg-base-100 shadow">
            <div className="card-body">
              <label className="input input-bordered flex items-center">
                <input type="text" className="grow" placeholder="Search" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                  <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                </svg>
              </label>
            </div>
          </div>
        </div>
        {token && (
          <>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">0</span>
                </div>
              </div>
              <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                <div className="card-body">
                  <span className="font-bold text-lg">8 Items</span>
                  <span className="text-second">Subtotal: Rp1000000</span>
                  <div className="card-actions">
                    <a className="btn bg-first text-third btn-block" href="/cart">
                      View cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button
                    onClick={() => {
                      if (confirm("Logout?")) handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      {!token && (
        <ul className="menu menu-xs md:menu-md menu-horizontal">
          <li>
            <details>
              <summary>Auth</summary>
              <ul className="px-3 flex flex-col gap-y-1">
                <li>
                  <a href="/login">
                    <FaRightFromBracket />
                    Login
                  </a>
                </li>
                <li>
                  <a href="/register">
                    <FaUserPlus />
                    Register
                  </a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
