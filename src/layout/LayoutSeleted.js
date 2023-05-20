import React, { useEffect, useState } from "react";
import SelectedLeftSidebar from "../modules/selected/SelectedLeftSidebar";
import SelectedRightSidebar from "../modules/selected/SelectedRightSidebar";
import { Outlet } from "react-router-dom";
import SelectedBottombar from "../modules/selected/SelectedBottombar";
import SelectedTopbar from "../modules/selected/SelectedTopbar";

const LayoutSeleted = () => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const targetPosition = 80; // ví dụ, scroll đến vị trí 500px.
    if (scrollPosition >= targetPosition) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };
  console.log(isSticky);
  return (
    <div
      className="relative flex min-h-screen bg-bg-color"
      // style={{
      //   backgroundImage: "url('/bg.svg')",
      //   // backgroundSize: "cover",
      //   backgroundPosition: "top",
      // }}
    >
      <SelectedLeftSidebar></SelectedLeftSidebar>
      <div className="relative flex flex-col flex-1 overflow-hidden mb-player-height">
        <SelectedTopbar sticky={isSticky}></SelectedTopbar>
        <div className="absolute left-0 right-0 h-full px-16 overflow-x-hidden overflow-y-scroll">
          <div className="mt-16">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      {/* <SelectedRightSidebar></SelectedRightSidebar> */}
      <SelectedBottombar></SelectedBottombar>
    </div>
  );
};

export default LayoutSeleted;
