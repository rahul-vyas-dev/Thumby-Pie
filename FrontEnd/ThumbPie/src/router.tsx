import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./MainLayout";
import UploadLayout from "./UploadLayout";

import App from "./App";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Pricing from "./pages/Pricing";
import SignIn from "./pages/Sign-In";
import SignUp from "./pages/Sign-Up";
import CodeVerification from "./pages/CodeVerification";
import Upload from "./pages/Upload";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "", element: <Home /> },
          { path: "home", element: <Home /> },
          { path: "blog", element: <Blog /> },
          { path: "pricing", element: <Pricing /> },
          { path: "signin", element: <SignIn /> },
          { path: "signup", element: <SignUp /> },
          { path: "code-verification", element: <CodeVerification /> },
        ],
      },
      {
        element: <UploadLayout />,
        children: [
          {
            path: "dashboard",
            element: <Upload />,
          },
        ],
      },
    ],
  },
]);
