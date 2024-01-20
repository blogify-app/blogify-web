import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {PostPage} from "@/pages/post";
import {HomePage} from "@/pages/home";
import {LoginPage} from "@/pages/auth";
import {Authenticated} from "@/features/auth";
import {AuthProvider} from "@/services/security";
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
    path: "/signup",
    element: <Signup />,
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
  {
    path: "/posts/:id",
    element: <PostPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={ROUTER} />
  </React.StrictMode>
);
