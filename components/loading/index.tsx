import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-[600px] ">
      <div className="w-12 h-12 border-t-4 border-b-4 border-temcolor rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
