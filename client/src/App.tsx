import { RouterProvider } from "react-router-dom";
import "./App.scss";
import { router } from "./routing/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UserContextProvider from "./contextProvider/UserContextProvider";

function App() {
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
        <ToastContainer autoClose={1000} />
      </UserContextProvider>
    </>
  );
}
export default App;
