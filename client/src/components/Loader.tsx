import React from "react";
import { PropagateLoader } from "react-spinners";

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <PropagateLoader color="var(--primary-color)" speedMultiplier={0.5} />
    </div>
  );
};

export default Loader;
