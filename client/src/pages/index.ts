import { lazy } from "react";

const IndexPage = lazy(() => import("./IndexPage.tsx"));
const LoginPage = lazy(() => import("./LoginPage.tsx"));
const RegisterPage = lazy(() => import("./RegisterPage.tsx"));
const CreatePostPage = lazy(() => import("./CreatePostPage.tsx"));
const EditPostPage = lazy(() => import("./EditPostPage.tsx"));
const SinglePostPage = lazy(() => import("./SinglePostPage.tsx"));
const Layout = lazy(() => import("./Layout.tsx"));

export {
  IndexPage,
  LoginPage,
  RegisterPage,
  CreatePostPage,
  EditPostPage,
  SinglePostPage,
  Layout,
};
