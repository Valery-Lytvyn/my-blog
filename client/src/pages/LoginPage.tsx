import React, { useCallback, useContext, useState } from "react";
import AuthInput from "../components/ui/AuthInput";
import SubmitButton from "../components/ui/SubmitButton";
import { DEFAULT_SERVER_URL } from "../constant";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../routing/routes";
import { CurrentUserContext } from "../contextProvider/UserContextProvider";

const defaultFormData = {
  username: "",
  password: "",
};

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [isRedirect, setIsRedirect] = useState(false);
  const { setCurrentUser } = useContext(CurrentUserContext);

  const changeInputHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    },
    [setFormData],
  );

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${DEFAULT_SERVER_URL}/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const userinfo = await response.json();
        if (userinfo && userinfo.id) {
          toast.success("Successfully logged in");
          setCurrentUser(userinfo);
          setIsRedirect(true);
        } else {
          toast.error("Invalid response data");
        }
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  if (isRedirect) {
    return <Navigate to={ROUTES.index} />;
  }

  return (
    <div className="auth-page">
      <h1>Login</h1>
      <form className="auth-form" onSubmit={submitHandler}>
        <AuthInput
          id="username"
          type="text"
          name="username"
          value={formData.username}
          placeholder="username"
          changeInputHandler={changeInputHandler}
        />
        <AuthInput
          id="password"
          type="password"
          name="password"
          value={formData.password}
          placeholder="password"
          changeInputHandler={changeInputHandler}
        />
        <SubmitButton title="Login" />
      </form>
    </div>
  );
};

export default LoginPage;
