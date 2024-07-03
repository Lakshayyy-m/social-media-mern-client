import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LoginContextProvider } from "./context/LoginContextComponents.tsx";
import QueryProvider from "./context/QueryProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <LoginContextProvider>
        <App />
      </LoginContextProvider>
    </QueryProvider>
  </React.StrictMode>
);
