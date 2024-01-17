import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {HomePage} from "@/pages/home";
import {LoginPage} from "@/pages/auth";
import {Authenticated} from "@/features/auth";
import {AuthProvider} from "@/services/auth_provider.ts";
import "./index.css";

// eslint-disable-next-line react-refresh/only-export-components
const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/protected",
    element: (
      <Authenticated>
        <h1>Connected</h1>
        <button
          onClick={() => {
            void AuthProvider.logOut().then(() => {
              window.location.reload();
            });
          }}
        >
          logout
        </button>
      </Authenticated>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={ROUTER} />
  </React.StrictMode>
);
