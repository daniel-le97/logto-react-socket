import Home from "./pages/Home";
import More from "./pages/More";
import Callback from "./pages/Callback";
import RequireAuth from "./lib/auth/RequireAuth";
import ProtectedResource from "./pages/ProtectedResource";
import ReactQuery from "./pages/ReactQuery";
import Organizations from "./pages/Organizations";
import { createBrowserRouter } from "react-router-dom";
// import { lazy } from "react";

const routesConfig = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/more",
    element: <More />,
  },
  {
    path: "/callback",
    element: <Callback />,
  },
  {
    path: "/protected",
    element: <RequireAuth />,
    children: [
      {
        index: true,
        element: <ProtectedResource />,
      },
      {
        path: "react-query",
        element: <ReactQuery />,
      },
      {
        path: "organizations",
        element: <Organizations />,
      },
    ],
  },
];

export const router = createBrowserRouter(routesConfig);

export default routesConfig;
