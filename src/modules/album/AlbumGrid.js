import React from "react";

const AlbumGrid = ({ children }) => {
  return <div className="grid grid-cols-5 gap-y-8 gap-x-auto">{children}</div>;
};

export default AlbumGrid;
// flex flex-wrap justify-between
