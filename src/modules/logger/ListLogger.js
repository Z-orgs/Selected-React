import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLoggers } from "redux/apiRequest";

const ListLogger = () => {
  const admin = useSelector((state) => state.auth.login?.currentUser);
  const [searchLevel, setSearchLevel] = useState("");
  const dispatch = useDispatch();
  const listLogger = useSelector((state) => state.logger.loggers?.allLoggers);
  useEffect(() => {
    getAllLoggers(admin?.admin_token, dispatch);
  }, []);
  localStorage.setItem("token", admin?.data?.admin_token);
  return (
    <>
      {/* <div>
        <input
          type="text"
          placeholder="Search by level"
          value={searchLevel}
          onChange={(e) => setSearchLevel(e.target.value)}
        />
      </div>
      <div>
        {listLogger &&
          listLogger
            .filter((item) =>
              item.level.toLowerCase().includes(searchLevel.toLowerCase())
            )
            .map((item) => (
              <div key={item._id}>
                <label>Level:</label> &nbsp;
                {item.level}
                <br></br>
                <label>Username:</label> &nbsp;
                {item.username}
                <br></br>
                <label>Time:</label> &nbsp;
                {item.time}
                <br></br>
                <label>Log:</label> &nbsp;
                {item.log}
                <br></br>
                ----------------------------------------
              </div>
            ))}
      </div> */}
      <div>
        <div className="flex flex-col w-full h-[60vh] border-2 border-primary rounded-md bg-alpha-bg">
          <div className="grid grid-cols-3 bg-violet-900">
            <div className="flex items-center justify-center p-4 text-lg font-bold text-white cursor-pointer hover:bg-alpha-bg">
              Admin
            </div>
            <div className="flex items-center justify-center p-4 text-lg font-bold text-white cursor-pointer hover:bg-alpha-bg">
              Artirst
            </div>
            <div className="flex items-center justify-center p-4 text-lg font-bold text-white cursor-pointer hover:bg-alpha-bg">
              User
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default ListLogger;
