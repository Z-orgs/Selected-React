import React from "react";
import DashboardRightSidebar from "../modules/dashboard/DashboardRightSidebar";
import DashboardLeftSidebar from "../modules/dashboard/DashboardLeftSidebar";
import { Outlet } from "react-router-dom";

const LayoutDashboard = () => {
  return (
    <div className="flex justify-between h-screen px-2 py-5 bg-dashboard-color">
      <DashboardLeftSidebar></DashboardLeftSidebar>
      <div className="w-[75%] bg-white rounded-md p-4">
        <Outlet></Outlet>
      </div>
      <DashboardRightSidebar></DashboardRightSidebar>
    </div>
  );
};

export default LayoutDashboard;
