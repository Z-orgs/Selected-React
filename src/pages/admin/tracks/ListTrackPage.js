import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTracks } from "redux/apiRequest";
import HeadingOverView from "components/common/HeadingOverView";
import IconApproveToggle from "components/icons/IconApproveToggle";
import PlayerV2 from "modules/player/PlayerV2";

const ListTrackPage = () => {
  const admin = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const listTracks = useSelector((state) => state.track.tracks?.allTracks);
  const [index, setIndex] = useState(0);
  // const [active, setActive] = useState(false);
  const handlePickTrack = (i) => {
    setIndex(i);
  };
  console.log(index);
  useEffect(() => {
    getAllTracks(admin?.data?.admin_token, dispatch);
  }, []);
  localStorage.setItem("token", admin?.data?.admin_token);
  return (
    <>
      <HeadingOverView
        imgUrl="/bg-3.jpg"
        total={listTracks.length}
        type="tracks"
      ></HeadingOverView>
      <div className="flex gap-4">
        <div
          className="max-h-[80vh] overflow-auto  rounded-md w-[60%] flex flex-wrap gap-4 p-4 bg-bg-color"
          //   style={{
          //     backgroundImage: "url('/bg-3.jpg')",
          //     backgroundSize: "cover",
          //     backgroundPosition: "center",
          //   }}
        >
          {listTracks &&
            listTracks.map((item, i) => (
              <div
                className={`flex items-center gap-2 p-2  bg-[rgba(255,255,255,0.9)] rounded-md cursor-pointer select-none border-2 ${
                  index === i ? "border-primary text-primary" : ""
                }`}
                key={item._id}
                onClick={() => handlePickTrack(i)}
              >
                <h3>
                  {item.title} - {item.artist}
                </h3>
                <span>
                  <IconApproveToggle
                    size="18"
                    isPublic={item.status}
                  ></IconApproveToggle>
                </span>
              </div>
            ))}
        </div>
        <div className="items-center flex-1">
          <PlayerV2 songs={listTracks} index={index}></PlayerV2>
        </div>
      </div>
    </>
  );
};

export default ListTrackPage;
