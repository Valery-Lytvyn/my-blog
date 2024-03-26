import React from "react";

interface CreatePostInputProps {
  type: "text" | "file";
  placeholder?: string;
  id: string;
  value?: string;
  changeInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CreatePostInput: React.FC<CreatePostInputProps> = ({
  id,
  type,
  placeholder,
  value,
  changeInputHandler,
}) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={changeInputHandler}
      className="create-post-input"
    />
  );
};

export default CreatePostInput;
