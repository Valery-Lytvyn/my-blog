import React from "react";

interface SubmitButtonProps {
  title: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ title }) => {
  return (
    <button type="submit" className="custom-button">
      {title}
    </button>
  );
};

export default SubmitButton;
