import { FaRightFromBracket, FaUserPlus, FaUser, FaPowerOff, FaTableColumns } from "react-icons/fa6";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUser, logout } from "../slices/authSlice";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { getUser } from "../api";
import { useEffect } from "react";

const Navbar = () => {
  const { user, token } = useSelector((state) => state.auth);

  const location = useLocation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Fetch User Data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser(token);
        dispatch(setUser(data));
      } catch (error) {
        return;
      }
    };
    fetchUser();
  }, [token]);

  const handleLogout = async () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.post(`${backendURL}/auth/logout`).then((response) => {
      dispatch(logout());
      alert(response.data.message);
      navigate("/");
    });
  };

  const { cart, totalPrice } = useSelector((state) => state.cart);

  const indoCurrency = (price) => {
    return price?.toLocaleString("id-ID", { styles: "currency", currency: "IDR" });
  };

  const getTotalItem = () => {
    const total = cart?.reduce((acc, item) => acc + item.total_quantity, 0);
    return total;
  };

  return (
    <div className="navbar flex justify-center px-10 md:px-16 pt-4">
      <a href="/" className="md:scale-100">
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
          {/* <li>
            <a>Category</a>
            <ul className="p-2">
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </li> */}
        </ul>
      </div>
      <div className="navbar hidden lg:flex lg:justify-center">
        <ul className="menu menu-horizontal z-[1]">
          <li>
            <a href="/" className={`duration-500 ${location.pathname == "/" ? "bg-first text-third font-semibold" : ""}`}>
              Home
            </a>
          </li>
          <li>
            <a href="/product" className={`duration-500 ${location.pathname == "/product" ? "bg-first text-third font-semibold" : ""}`}>
              Product
            </a>
          </li>
          {/* <li>
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
          </li> */}
        </ul>
      </div>
      <div className="flex-none gap-x-1">
        {token && (
          <>
            {!user?.data?.is_admin && (
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
                    <span className="badge badge-sm indicator-item">{getTotalItem() || 0}</span>
                  </div>
                </div>
                <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                  <div className="card-body">
                    <span className="font-bold text-lg">{getTotalItem() || 0} Item(s)</span>
                    <span className="text-second">Total: Rp{indoCurrency(totalPrice)},00</span>
                    <div className="card-actions">
                      <a className="btn bg-first text-third btn-block" href="/cart">
                        View cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                {!user?.data?.is_admin && (
                  <li>
                    <a href="/profile">
                      <FaUser />
                      Profile
                    </a>
                  </li>
                )}
                <li className={`${user?.data?.is_admin ? "block" : "hidden"}`}>
                  <a href="/admin">
                    <FaTableColumns />
                    Dashboard
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
        )}
      </div>
      {!token && (
        <ul className="menu menu-xs md:menu-md menu-horizontal z-[1]">
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
