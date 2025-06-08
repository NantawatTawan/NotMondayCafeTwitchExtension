import { createBrowserRouter } from "react-router-dom";
import MainPage from "./screens/MainPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/*",
    element: <MainPage />,
  },
  {
    path: "/main",
    element: <MainPage />,
  },
]);
