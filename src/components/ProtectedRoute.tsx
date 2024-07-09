import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "../context/loginContext";
// import { toast } from "sonner";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { isLoggedIn, setRedirectURL } = useLogin();
  const navigate = useNavigate();
  const URL = useLocation();
  useEffect(() => {
    if (!isLoggedIn) {
      setRedirectURL(URL.pathname);
      // toast("You have to login first!");
      navigate("/login");
    }
  }, [URL.pathname, isLoggedIn, navigate, setRedirectURL]);

  !isLoggedIn && (
    <div className="h-screen w-screen text-4xl mainFont">
      <h1>Kindly Login!</h1>
    </div>
  );

  return <Outlet />;
};

export default ProtectedRoute;
