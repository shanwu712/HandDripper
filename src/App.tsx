import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import FormPage from "./pages/FormPage";
import HistoryPage from "./pages/HistoryPage";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import Button from "./components/Button";

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
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
