import React, { useEffect, useState, useRef } from "react";
import SelectedLeftSidebar from "../modules/selected/SelectedLeftSidebar";
import SelectedRightSidebar from "../modules/selected/SelectedRightSidebar";
import { Outlet } from "react-router-dom";
import SelectedBottombar from "../modules/selected/SelectedBottombar";
import SelectedTopbar from "../modules/selected/SelectedTopbar";

const LayoutSeleted = () => {
  const [isSticky, setIsSticky] = useState(false);
  const outletRef = useRef(null);

  useEffect(() => {
    const targetPosition = 20; // ví dụ, scroll đến vị trí 500px.
    const handleScroll = () => {
      const scrollPosition = outletRef.current.scrollTop;
      if (scrollPosition >= targetPosition) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    outletRef.current.addEventListener("scroll", handleScroll);
    return () => {
      if (outletRef.current)
        outletRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log(isSticky);
  return (
    <div className="relative flex min-h-screen bg-bg-color">
      <SelectedLeftSidebar></SelectedLeftSidebar>
      <div className="relative flex flex-col flex-1 overflow-hidden mb-player-height">
        <SelectedTopbar sticky={isSticky}></SelectedTopbar>
        <div
          ref={outletRef}
          className="absolute left-0 right-0 h-full px-16 overflow-x-hidden overflow-y-scroll"
        >
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
