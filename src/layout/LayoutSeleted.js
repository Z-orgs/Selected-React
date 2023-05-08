import React from "react";
import SelectedLeftSidebar from "../modules/selected/SelectedLeftSidebar";
import SelectedRightSidebar from "../modules/selected/SelectedRightSidebar";
import { Outlet } from "react-router-dom";

const LayoutSeleted = () => {
  return (
    <div>
      <SelectedLeftSidebar></SelectedLeftSidebar>
      <Outlet></Outlet>
      <SelectedRightSidebar></SelectedRightSidebar>
    </div>
  );
};

export default LayoutSeleted;
