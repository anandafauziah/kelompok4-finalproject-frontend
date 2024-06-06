import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../slices/authSlice";
import { useNavigate, useLocation } from "react-router";
import { useEffect } from "react";

function useLogin() {
  const { token, expired } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const privateRoutes = ["/cart", "/profile", "/admin*"];

  useEffect(() => {
    if (token) {
      const interval = setInterval(() => {
        if (expired > 0 || expired != null) {
          dispatch(login({ token, expired: expired - 1 }));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [token, expired, dispatch]);

  useEffect(() => {
    if (token) {
      if (expired <= 0) {
        dispatch(logout());
        console.log("logged out");
        if (privateRoutes.includes(location.pathname)) {
          navigate("/login");
        }
      }
    }
  }, [expired, dispatch, navigate, location, privateRoutes]);

  return null;
}

export default useLogin;
