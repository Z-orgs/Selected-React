import React from "react";

const GridView = ({ children }) => {
  return <div className="grid grid-cols-5 gap-y-8 gap-x-auto">{children}</div>;
};

export default GridView;
// flex flex-wrap justify-between
