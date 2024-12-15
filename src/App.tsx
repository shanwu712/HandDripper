import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Homepage from "./pages/Homepage";
import FormPage from "./pages/FormPage";
import HistoryPage from "./pages/HistoryPage";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import Button from "./components/Button";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Homepage />,
        handle: { navBtn: ["How to use HandDripper"] },
      },
      {
        path: "/form",
        element: <FormPage />,
        handle: { navBtn: ["", <Button type="primary">Log Out</Button>] },
      },
      {
        path: "/history",
        element: <HistoryPage />,
        handle: {
          navBtn: [
            <Link to="/form">Back to Dripping</Link>,
            <Button type="primary">Log Out</Button>,
          ],
        },
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
