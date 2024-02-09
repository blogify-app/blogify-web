import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Toaster} from "@/components/shadcn-ui/toaster";
import {TooltipProvider} from "@/components/shadcn-ui/tooltip.tsx";
import {HomePage} from "@/pages/home";
import {DummyAuthenticatedPage, LoginPage, SignupPage} from "@/pages/auth";
import {PostListPage, PostPage, WritePostPage} from "@/pages/post";
import {Authenticated} from "@/features/auth";
import {ProfilePage, ProfileEditPage} from "@/pages/profile";
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
    path: "/posts",
    element: <PostListPage />,
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
  {
    path: "/users/:id",
    element: <ProfilePage />,
  },
  {
    path: "/users/edit/:id",
    element: (
      <Authenticated>
        <ProfileEditPage />
      </Authenticated>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <TooltipProvider>
      <RouterProvider router={ROUTER} />
    </TooltipProvider>
  </React.StrictMode>
);
