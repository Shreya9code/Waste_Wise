import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import LoadingButton from "../ui/LoadingButton";
import toast from "react-hot-toast";
import apis from "../../utils/apis";
const Super = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRouteAccess = async (event) => {
      try {
        const response = await fetch(apis().getAccess, {
          method: "POST",
          body: JSON.stringify({ token: localStorage.getItem("passToken") }),
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.message);
          //setLoading(false);
        }
        if (result?.status) {
          setLoading(false);
          setIsAuth(true);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    getRouteAccess();
  }, []);
  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Super;
