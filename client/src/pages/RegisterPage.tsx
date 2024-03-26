import React, { useState } from "react";
import AuthInput from "../components/ui/AuthInput";
import SubmitButton from "../components/ui/SubmitButton";
import { DEFAULT_SERVER_URL } from "../constant";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../routing/routes";

const defaultFormData = {
  username: "",
  password: "",
};

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [isRedirect, setIsRedirect] = useState(false);

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${DEFAULT_SERVER_URL}/register`, {
        method: "POST",
        body: JSON.stringify({ formData }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        toast.success("Register successfully");
        setIsRedirect(true);
      } else {
        toast.error("Register failed");
      }
    } catch (error) {
      toast.error("Register failed");
    }
  };

  if (isRedirect) {
    return <Navigate to={ROUTES.login} />;
  }

  return (
    <div className="auth-page">
      <h1>Register</h1>
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
        <SubmitButton title="Register" />
      </form>
    </div>
  );
};

export default RegisterPage;
