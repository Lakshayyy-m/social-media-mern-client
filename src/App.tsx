import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootNavigation from "./components/RootNavigation";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ReverseProtectedRoute from "./components/ReverseProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootNavigation />,
      children: [
        {
          path: "/",
          element: <ProtectedRoute />,
          children: [
            {
              path: "/",
              element: <h1 className="text-white">Running correctly</h1>,
            },
          ],
        },
      ],
    },
    {
      path: "/login", //Todo also implement reverse protection here as well
      element: <ReverseProtectedRoute />,
      children: [
        {
          path: "/login",
          element: <LoginPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

//Todo Implementing protected routes

export default App;
