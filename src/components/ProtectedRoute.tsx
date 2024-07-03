import { Outlet, useNavigate } from "react-router-dom";
import { useLogin } from "../context/loginContext";
import { toast } from "sonner";

const ProtectedRoute = () => {
  const { isLoggedIn } = useLogin();
  const navigate = useNavigate();
  if (!isLoggedIn) {
    toast("You have to login first!");
    navigate("/login");
  }

  return <Outlet />;
};

export default ProtectedRoute;
