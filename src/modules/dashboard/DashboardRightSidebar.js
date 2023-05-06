import React from "react";
import { IconLogout } from "../../components/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const DashboardRightSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-between flex-1 flex-shrink-0 px-4 py-12 ml-4 border-l border-gray-300">
      <div>
        <div className="relative rounded-full w-[80px] m-auto">
          <img src="/avt.jpg" alt="" className="object-cover rounded-full" />
          <span className="absolute w-[20px] h-[20px] bg-green-500 block rounded-full border-2 border-white top-0 right-0"></span>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold">Bẩy Tiệu</h3>
          <p>Admin</p>
        </div>
      </div>
      <span
        onClick={handleLogout}
        className="block p-4 bg-black rounded-full cursor-pointer"
      >
        <IconLogout className="fill-white w-[24px]"></IconLogout>
      </span>
    </div>
  );
};

export default DashboardRightSidebar;
