import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../slices/authSlice";
import { useLocation } from "react-router";
import { useEffect } from "react";

function useLogin() {
  const { token, expired } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

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
      if (expired <= 0 || expired == null) {
        alert("Login expired, please log in again!");
        dispatch(logout());
      }
    }
  }, [expired, dispatch, location]);

  return null;
}

export default useLogin;
