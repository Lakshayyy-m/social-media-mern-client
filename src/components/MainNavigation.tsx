import { useMutation } from "@tanstack/react-query";
import { useLogin } from "../context/loginContext";
import Button from "./InteractiveButton";
import { NavLink } from "react-router-dom";
import { MyError } from "../lib/MyError";
import searchIcon from "../assets/searchIcon.svg";
import { motion } from "framer-motion";
import { toast } from "sonner";
import profilePic from "../assets/profileImg.svg";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import Profile from "./Profile";
import { ScrollArea } from "./ui/scroll-area";
import Loading from "./Loading";
import SearchComponent from "./SearchComponent";
import { useState } from "react";
import { cn } from "../lib/utils";

const MainNavigation = () => {
  const { isLoggedIn, setIsLoggedIn, setUser, user } = useLogin();
  const [searchIsActive, setSearchIsActive] = useState<boolean>(false);

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
    <motion.div
      layout
      className="w-screen flex max-lg:flex-col bg-pink-1 items-center justify-center"
    >
      <div className="w-screen lg:p-6 max-lg:py-3 max-lg:px-7 bg-pink-1 flex justify-between rounded-b-xl items-center gap-6 max-lg:gap-14">
        <div className="flex lg:gap-28 gap-10 items-center">
          <p className="mainFont font-extrabold text-2xl md:text-4xl">
            Pinkterest
          </p>
        </div>
        <motion.div
          className="w-full basis-[70%] flex lg:justify-center "
          layoutId="search"
          onClick={() => {
            if (window.innerWidth <= 1024) setSearchIsActive(true);
          }}
        >
          <div
            className={cn(
              "bg-dark-3 flex justify-center items-center max-lg:rounded-full lg:rounded-s-full lg:ps-4 max-lg:px-2 max-lg:py-3 min-w-[50px] max-w-[50px]",
              { hidden: searchIsActive && window.innerWidth <= 1024 }
            )}
          >
            <img
              src={searchIcon}
              alt="Search"
              className="bg-dark-3 w-8 px-1 rounded-full "
            />
          </div>

          <SearchComponent mobileShow={false} />
        </motion.div>
        {!isLoggedIn ? (
          <NavLink to={"/login"} className="">
            <Button className="hover:bg-black transition-colors text-lg hover:text-white px-2 py-1 rounded-lg font-bold">
              Login
            </Button>
          </NavLink>
        ) : (
          <Drawer>
            <DrawerTrigger className="flex gap-6 items-center rounded-full min-w-8">
              <img
                src={user?.profileImg === "" ? profilePic : user?.profileImg}
                alt="Profile"
                className="min-w-[60px] max-w-[60px]"
              />
            </DrawerTrigger>
            <DrawerContent className="bg-dark-3 shadow-lg border-none relative">
              {isPending && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-dark-3 bg-opacity-20">
                  <Loading />
                </div>
              )}
              <DrawerHeader>
                <DrawerTitle className="text-4xl lg:px-7 text-white mb-14">
                  My Profile
                </DrawerTitle>
              </DrawerHeader>
              <ScrollArea className="overflow-y-auto">
                <Profile user={user!} self={true} logout={logout} />
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        )}
      </div>
      {searchIsActive && (
        <motion.div
          className="w-full p-4 flex justify-center lg:hidden"
          layoutId="search"
        >
          <div
            className="bg-dark-3 flex justify-center items-center rounded-s-full lg:ps-4 max-lg:px-2 max-lg:py-3 min-w-[60px] max-w-[60px]"
            onClick={() => setSearchIsActive(false)}
          >
            <img
              src={searchIcon}
              alt="Search"
              className="bg-dark-3 w-8 px-1 rounded-full "
            />
          </div>
          <SearchComponent mobileShow={true} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default MainNavigation;
