import React from "react";

const LayoutForm = ({ title, children }) => {
  return (
    <div
      className={`relative  bg-bg-color-2 min-h-[500px] flex flex-col justify-between max-h-[90vh] w-[800px]`}
    >
      <div
        className="h-[140px] w-full"
        style={{
          backgroundImage: "url('/UpWave.svg')",
          backgroundPosition: "bottom",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <h3 className="absolute inline-block text-4xl font-semibold text-white capitalize top-4 left-2/4 -translate-x-2/4">
        {title}
      </h3>
      <div className="flex flex-col items-center w-full max-h-[calc(100% - 140px - 120px)] overflow-auto">
        {children}
      </div>
      <div
        className="h-[120px] w-full"
        style={{
          backgroundImage: "url('/DownWave.svg')",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
        }}
      ></div>
    </div>
  );
};

export default LayoutForm;
