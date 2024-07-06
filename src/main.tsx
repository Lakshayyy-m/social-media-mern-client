import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LoginContextProvider } from "./context/LoginContextComponents.tsx";
import QueryProvider from "./context/QueryProvider.tsx";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <LoginContextProvider>
        <App />
        <Toaster />
      </LoginContextProvider>
    </QueryProvider>
  </React.StrictMode>
);
