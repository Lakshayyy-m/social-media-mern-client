import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";


const RootNavigation = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>

    </>
  );
};

export default RootNavigation;
