import React, { Suspense } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Loader from "../components/Loader";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;
