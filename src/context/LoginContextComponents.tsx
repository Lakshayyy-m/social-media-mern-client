import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  // useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { UserType } from "../lib/types";

type LoginContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  redirectURL: string | undefined;
  setRedirectURL: Dispatch<SetStateAction<undefined | string>>;
  user: UserType | undefined;
  setUser: Dispatch<SetStateAction<(UserType | undefined) | undefined>>;
};

export const LoginContext = React.createContext<LoginContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  redirectURL: undefined,
  setRedirectURL: () => {},
  user: undefined,
  setUser: () => {},
});

export const LoginContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [redirectURL, setRedirectURL] = useState<undefined | string>(undefined);
  const [user, setUser] = useState<undefined | UserType>();

  useLayoutEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/user/checkAuth", {
        method: "POST",
      });
      if (response.status !== 200) {
        setIsLoggedIn(false);
        return;
      }
      const data = await response.json();
      setIsLoggedIn(true);
      setUser(data.user);
    };
    checkAuth();
  }, []);

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        redirectURL,
        setRedirectURL,
        setUser,
        user,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
