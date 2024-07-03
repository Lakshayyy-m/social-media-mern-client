import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootNavigation from "./components/RootNavigation";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootNavigation />,
      children: [
        {
          path: "/",
          element: <ProtectedRoute />,
        },
      ],
    },
    {
      path: "/login", //Todo also implement reverse protection here as well
      element: <LoginPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

//Todo Implementing protected routes

export default App;
