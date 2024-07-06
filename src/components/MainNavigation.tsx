import { useMutation } from "@tanstack/react-query";
import { useLogin } from "../context/loginContext";
import Button from "./InteractiveButton";
import { NavLink } from "react-router-dom";
import { MyError } from "../lib/MyError";
import { toast } from "sonner";

const MainNavigation = () => {
  const { isLoggedIn, setIsLoggedIn, setUser, user } = useLogin();

  const { isPending, mutate: logout } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/user/logout", {
        method: "POST",
      });

      const { message } = await response.json();

      if (response.status !== 200) {
        throw new MyError(message, response.status);
      }

      return message;
    },
    onError: (error) => {
      toast(error.message);
    },
    onSuccess: (message) => {
      toast(message);
      setIsLoggedIn(false);
      setUser(undefined);
    },
  });

  return (
    <div className="w-screen p-6 bg-pink-1 flex justify-between rounded-b-xl">
      <p className="mainFont font-extrabold text-4xl">Pinkterest</p>
      {/* //todo this login button should be shown conditionally */}
      {!isLoggedIn ? (
        <NavLink to={"/login"}>
          <Button className="hover:bg-black transition-colors text-lg hover:text-white px-2 py-1 rounded-lg font-bold">
            Login
          </Button>
        </NavLink>
      ) : (
        <div className="flex gap-6 items-center">
          <h1>{user?.name}</h1>
          <Button
            className="hover:bg-black transition-colors text-lg hover:text-white px-2 py-1 rounded-lg font-bold"
            onClick={() => {
              logout();
            }}
          >
            {isPending ? "Logging Out.." : "Logout"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MainNavigation;
