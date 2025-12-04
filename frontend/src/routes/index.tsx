import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import NotFoundPage from "@/pages/NotFoundPage";
import HomePage from "@/pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);
