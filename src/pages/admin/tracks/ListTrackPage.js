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
  const [result, setResult] = useState(listTracks);
  const formatText = (str) =>
    str
      .toLowerCase()
      .replace(/đ/g, "d")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
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
  const handleSearchTrack = (e) => {
    setResult(
      listTracks.filter((track) =>
        formatText(track.title).includes(formatText(e.target.value))
      )
    );
    console.log(result);
  };
  return (
    <>
      <HeadingOverView
        imgUrl="/bg-3.jpg"
        total={listTracks && listTracks.length}
        type="tracks"
      ></HeadingOverView>
      <div className="flex gap-4">
        <div className="w-[60%] bg-bg-color overflow-auto h-[80vh] flex flex-col">
          <div className="w-full p-4">
            <input
              className="w-full h-[40px] outline-none rounded-md text-base px-2"
              type="Enter text..."
              onChange={handleSearchTrack}
            />
          </div>
          <div
            className="flex flex-wrap gap-4 p-4 overflow-auto rounded-md "
            //   style={{
            //     backgroundImage: "url('/bg-3.jpg')",
            //     backgroundSize: "cover",
            //     backgroundPosition: "center",
            //   }}
          >
            {result &&
              result.map((item, i) => (
                <div
                  className={`flex items-center gap-2 p-2 bg-[rgba(255,255,255,0.9)] rounded-md cursor-pointer select-none border-2 ${
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
        </div>
        <div className="items-center flex-1">
          <PlayerV2
            songs={result}
            index={index}
            handlePlayPause={hanldePlayPause}
            isPlaying={isPlaying}
            setAudioIndex={setIndex}
            setPlaying={setIsPlaying}
          >
            <button
              onClick={handleApproveTrack}
              className={`px-4 py-2 text-white rounded-md min-w-[120px] my-2 font-semibold block text-lg ${
                result[index].status
                  ? "bg-blue-400 text-gray-100"
                  : "bg-blue-500"
              }`}
              disabled={result[index].status}
            >
              {result[index].status ? "Approved" : "Approve"}
            </button>
          </PlayerV2>
        </div>
      </div>
    </>
  );
};

export default ListTrackPage;
