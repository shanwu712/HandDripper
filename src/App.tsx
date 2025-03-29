import {
  createBrowserRouter,
  Link,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Homepage from "./pages/Homepage";
import FormPage from "./pages/FormPage";
import HistoryPage from "./pages/HistoryPage";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./UserContext";
import useUser from "./useUser";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        path: "/",
        element: <Homepage />,
        handle: { navBtn: "" },
        // handle: { navBtn: ["How to use HandDripper"] },
      },

      {
        path: "/form",
        element: <ProtectedRoute element={<FormPage />} />,
        handle: {
          navBtn: ["", "Log Out"],
        },
      },
      {
        path: "/history",
        element: <ProtectedRoute element={<HistoryPage />} />,
        handle: {
          navBtn: [<Link to="/form">Back to Dripping</Link>, "Log Out"],
        },
      },
    ],
  },
]);

function ProtectedRoute({ element }: { element: JSX.Element }) {
  const { userId } = useUser();

  if (!userId) {
    return <Navigate to="/" />;
  }

  return element;
}

function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "white",
              color: "black",
            },
          }}
        />
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
