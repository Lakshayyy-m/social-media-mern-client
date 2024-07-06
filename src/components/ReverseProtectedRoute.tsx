import { Outlet, useNavigate } from "react-router-dom";
import { useLogin } from "../context/loginContext";
import { useEffect } from "react";

const ReverseProtectedRoute = () => {
  const { isLoggedIn } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return <Outlet />;
};

export default ReverseProtectedRoute;
