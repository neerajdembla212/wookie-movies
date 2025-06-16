import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./Layout";
import HomePage, { homeLoader } from "./pages/Home";
import Details, { detailsLoader } from "./pages/Details";
import ErrorFallback from "./components/ErrorFallback";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorFallback />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: homeLoader,
        errorElement: <ErrorFallback />,
      },
      {
        path: "/movie/:slug",
        element: <Details />,
        loader: detailsLoader,
        errorElement: <ErrorFallback />,
      },
    ],
  },
]);
