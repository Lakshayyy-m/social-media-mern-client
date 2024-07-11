import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootNavigation from "./components/RootNavigation";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ReverseProtectedRoute from "./components/ReverseProtectedRoute";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";

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
              children: [
                {
                  path: "/post/:id",
                  element: <PostPage />,
                },
                {
                  path: "/user/:id",
                  element: <ProfilePage />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/login",
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

export default App;
