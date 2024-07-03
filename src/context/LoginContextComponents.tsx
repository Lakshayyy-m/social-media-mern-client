import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type LoginContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export const LoginContext = React.createContext<LoginContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const LoginContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};
