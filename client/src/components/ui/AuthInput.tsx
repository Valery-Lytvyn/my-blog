import React, { memo } from "react";

interface AuthInputProps {
  type: "text" | "password" | "email";
  placeholder: string;
  name: string;
  id: string;
  value: string;
  changeInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthInput: React.FC<AuthInputProps> = memo(
  ({ id, type, placeholder, name, value, changeInputHandler }) => {
    return (
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={changeInputHandler}
        className="auth-input"
      />
    );
  },
);

export default AuthInput;
