import { LogtoProvider } from "@logto/react";
import "./App.module.css";
import { Client, config } from "./lib/auth/socket-logto";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export const App = () => {
  return (
    <LogtoProvider config={config} LogtoClientClass={Client}>
      <RouterProvider router={router} />
    </LogtoProvider>
  );
};
