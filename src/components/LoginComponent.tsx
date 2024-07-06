import Button from "./InteractiveButton";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { loginOrSignUp } from "../helpers/login";
import { toast } from "sonner";
import { cn } from "../lib/utils";
import { userSchema } from "../lib/validation";
import { MyError } from "../lib/MyError";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/loginContext";

const LoginComponent = () => {
  //To check whether the user signing in or logging in
  const [isLogin, setIsLogin] = useState(true);
  const url = isLogin ? "login" : "signup";
  const { setIsLoggedIn, redirectURL, setUser } = useLogin();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: loginOrSignUp,
    onSuccess: (data) => {
      toast("You are now successfully logged in!");
      setIsLoggedIn(true);
      setUser(data.user);
      navigate(redirectURL ? redirectURL : "/");
    },
    onError: (error: MyError) => {
      toast(error.message);
      if (error.status === 302) {
        setIsLogin(false);
      }
    },
  });

  const login = (formData: FormData) => {
    const data = Object.fromEntries(formData);
    const result = userSchema.safeParse(data);
    if (!result.success) {
      toast(result.error.issues[0].message);
      return;
    }
    mutate({ formData: data, url });
  };

  return (
    <motion.div
      className="w-[90%] md:w-[60%] lg:w-[50%] lg:max-w-[575px] bg-dark-2 p-10 max-sm:px-6 flex flex-col gap-10 justify-center items-center rounded-2xl shadow-sm shadow-gray-600 transition-[height]"
      layout
    >
      <form
        method="POST"
        className="flex flex-col gap-10 justify-center items-center w-[100%] h-[100%]"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          login(formData);
        }}
      >
        <motion.h3 className="text-4xl text-white font-bold" layout>
          {isLogin ? "Login" : "Sign Up"}
        </motion.h3>
        {!isLogin && (
          <>
            <AnimatePresence>
              <motion.input
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.4 } }}
                exit={{ opacity: 0 }}
                type="text"
                name="fullname"
                className="w-[90%] h-[40px] rounded-lg bg-dark-3 text-stone-400 p-4 py-6 focus:border-x-4 border-pink-1 outline-none transition-all duration-300 text-lg"
                placeholder="Full Name"
                key={"fullname"}
              />
              <motion.input
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.4 } }}
                type="text"
                name="email"
                className="w-[90%] h-[40px] rounded-lg bg-dark-3 text-stone-400 p-4 py-6 focus:border-x-4 border-pink-1 outline-none transition-all duration-300 text-lg"
                placeholder="E-mail"
                key={"email"}
              />
            </AnimatePresence>
          </>
        )}
        <motion.input
          layout="position"
          transition={{ duration: 0.3 }}
          type="text"
          name="username"
          className="w-[90%] h-[40px] rounded-lg bg-dark-3 text-stone-400 p-4 py-6 focus:border-x-4 border-pink-1 outline-none transition-[border] duration-300 text-lg"
          placeholder="Username"
        />
        <motion.input
          layout="position"
          transition={{ duration: 0.3 }}
          type="password"
          name="password"
          placeholder="Password"
          className="w-[90%] h-[40px] rounded-lg bg-dark-3 text-stone-400 p-4 py-6 focus:border-x-4 border-pink-1 outline-none transition-[border]  duration-300 text-lg"
        />
        <Button
          className={cn(
            "bg-pink-1 px-16 py-4 rounded-lg text-xl font-semibold max-h-[60px]",
            {
              "animate-pulse": isPending,
              "duration-700": true,
            }
          )}
          type="submit"
        >
          {isLogin ? "Login" : "Sign Up"}
        </Button>
      </form>
      {isLogin ? (
        <p className="text-white">
          Don't have an account?&nbsp;&nbsp;
          <Button onClick={() => setIsLogin(false)}>SignUp</Button>
        </p>
      ) : (
        <p className="text-white">
          Already have an account?&nbsp;&nbsp;
          <Button onClick={() => setIsLogin(true)}>Login</Button>
        </p>
      )}
    </motion.div>
  );
};

export default LoginComponent;
