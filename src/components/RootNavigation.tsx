import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import { Toaster } from "sonner";


const RootNavigation = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <Toaster />
    </>
  );
};

export default RootNavigation;
