import { useEffect } from "react";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

import { logout } from "../redux/authSlice";

export const useAuthTimer = (token) => {
    
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;
    const decoded = jwtDecode(token);
    
    const expiryTime = decoded.exp * 1000 - Date.now();

    if (expiryTime <= 0) {
      dispatch(logout());
      return;
    }

    const timer = setTimeout(() => {
      dispatch(logout());
    }, expiryTime);

    return () => clearTimeout(timer);
  }, [token, dispatch]);
};
