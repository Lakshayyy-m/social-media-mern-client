import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { MyError } from "../lib/MyError";
import { cn } from "../lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import ProfileListCard from "./ProfileListCard";
import { UserType } from "../lib/types";
import Loading from "./Loading";

const SearchComponent = ({ mobileShow }: { mobileShow: boolean }) => {
  const [expand, setExpand] = useState(false);

  const { data, isPending, mutate, isError, error } = useMutation({
    mutationKey: ["search"],
    mutationFn: async ({ value }: { value: string }) => {
      const response = await fetch(`/api/user/searchUser/${value}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { users, message } = await response.json();
      if (response.status !== 200) {
        throw new MyError(message, response.status);
      }

      return users;
    },
  });

  const search = (value: string) => {
    mutate({ value });
  };

  return (
    <div
      className={cn(
        "w-full flex flex-col justify-center max-lg:items-center relative",
        {
          "max-lg:hidden": !mobileShow,
        }
      )}
    >
      <input
        onChange={(e) => search(e.target.value)}
        type="text"
        onFocus={() => setExpand(true)}
        onBlur={() => setExpand(false)}
        placeholder="Search"
        className={cn(
          "rounded-e-full bg-dark-3 lg:w-[80%] w-[100%] lg:min-w-[200px] text-stone-400 p-6 outline-none  duration-300 text-lg  px-6 py-2 h-14",
          { "rounded-ee-sm": expand }
        )}
      />

      {isPending ? (
        <motion.div
          className="bg-dark-3 min-h-[200px] h-full flex justify-center items-center lg:w-[80%] w-[100%] lg:min-w-[200px] absolute top-14 rounded-b-3xl searchBarShadow"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          <Loading />
        </motion.div>
      ) : (
        expand && (
          <motion.div
            className="bg-dark-3 min-h-[300px] lg:w-[80%] w-[100%] lg:min-w-[200px] absolute top-14 rounded-b-3xl searchBarShadow p-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <ScrollArea className="overflow-y-auto max-h-[60vh] ">
              {!data && (
                <p className="text-stone-500 flex justify-center items-center py-16 h-full">
                  Type something to search
                </p>
              )}
              {data && isError ? (
                <p className="text-stone-500 flex justify-center items-center py-16 h-full">
                  {error.message}
                </p>
              ) : data?.length === 0 ? (
                <p className="text-stone-500 flex justify-center items-center py-16 h-full">
                  No user found. Try typing more
                </p>
              ) : (
                data?.map((user: UserType) => {
                  return <ProfileListCard key={user._id} user={user} />;
                })
              )}
            </ScrollArea>
          </motion.div>
        )
      )}
    </div>
  );
};

export default SearchComponent;
