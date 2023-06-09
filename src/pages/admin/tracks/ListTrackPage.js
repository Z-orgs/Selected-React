import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTracks } from "redux/apiRequest";
import HeadingOverView from "components/common/HeadingOverView";
import IconApproveToggle from "components/icons/IconApproveToggle";
import PlayerV2 from "modules/player/PlayerV2";
import { IconPlayToggle } from "components/icons";
import axios from "api/axios";

const ListTrackPage = () => {
  const admin = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const listTracks = useSelector((state) => state.track.tracks?.allTracks);
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const ad = useSelector((state) => state.auth.login?.currentUser);

  const handlePickTrack = (i) => {
    setIndex(i);
  };
  const hanldePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const handleApproveTrack = async () => {
    const res = await axios.put(
      `/track/approved/${listTracks[index]._id}`,
      { id: listTracks[index]._id },
      {
        headers: { Authorization: `Bearer ${ad?.data?.admin_token}` },
      }
    );
    console.log(res);
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
                <span onClick={hanldePlayPause}>
                  <IconPlayToggle
                    currentColor="black"
                    playing={index === i && isPlaying}
                  ></IconPlayToggle>
                </span>
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
          <PlayerV2
            songs={listTracks}
            index={index}
            handlePlayPause={hanldePlayPause}
            isPlaying={isPlaying}
            setPlaying={setIsPlaying}
          >
            <button
              onClick={handleApproveTrack}
              className={`px-4 py-2 text-white rounded-md min-w-[120px] my-2 font-semibold block text-lg ${
                listTracks[index].status
                  ? "bg-blue-400 text-gray-100"
                  : "bg-blue-500"
              }`}
              disabled={listTracks[index].status}
            >
              {listTracks[index].status ? "Approved" : "Approve"}
            </button>
          </PlayerV2>
        </div>
      </div>
    </>
  );
};

export default ListTrackPage;
