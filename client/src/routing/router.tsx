import { createHashRouter } from "react-router-dom";
import { ROUTES } from "./routes";
import Layout from "../pages/Layout";
import {
  CreatePostPage,
  EditPostPage,
  IndexPage,
  LoginPage,
  RegisterPage,
  SinglePostPage,
} from "../pages";

export const router = createHashRouter([
  {
    path: ROUTES.index,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: ROUTES.login,
        element: <LoginPage />,
      },
      {
        path: ROUTES.register,
        element: <RegisterPage />,
      },
      {
        path: ROUTES.create,
        element: <CreatePostPage />,
      },
      {
        path: ROUTES.edit(null),
        element: <EditPostPage />,
      },
      {
        path: ROUTES.post(null),
        element: <SinglePostPage />,
      },
    ],
  },
]);
