import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../slices/authSlice";
import { useEffect } from "react";

function useLogin() {
  const { token, expired } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      const interval = setInterval(() => {
        if (expired > 0) {
          dispatch(login({ token, expired: expired - 1 }));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [token, expired, dispatch]);

  useEffect(() => {
    if (token) {
      if (expired <= 0) {
        alert("Login expired, please log in again!");
        dispatch(logout());
      }
    }
  }, [token, expired, dispatch]);

  return null;
}

export default useLogin;
