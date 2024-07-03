import Button from "./InteractiveButton";
import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <div className="w-screen p-6 bg-pink-1 flex justify-between rounded-b-xl">
      <p className="mainFont font-extrabold text-4xl">Pinkterest</p>
      {/* //todo this login button should be shown conditionally */}
      <NavLink to={"/login"}>
        <Button className="bg-black transition-colors text-lg text-white px-4 py-2 rounded-lg">
          Login
        </Button>
      </NavLink>
    </div>
  );
};

//TODO Authentication working with JWT

export default MainNavigation;
