import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Toaster} from "@/components/shadcn-ui/sonner";
import {HomePage} from "@/pages/home";
import {DummyAuthenticatedPage, LoginPage, SignupPage} from "@/pages/auth";
import {PostPage, WritePostPage} from "@/pages/post";
import {Authenticated} from "@/features/auth";
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
    element: <SignupPage />,
  },
  {
    path: "/authenticated",
    element: <DummyAuthenticatedPage />,
  },
  {
    path: "/posts/:id",
    element: <PostPage />,
  },
  {
    path: "/posts/write/:pid",
    element: (
      <Authenticated>
        <WritePostPage />
      </Authenticated>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={ROUTER} />
  </React.StrictMode>
);
