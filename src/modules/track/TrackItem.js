import React, { useEffect, useRef, useState } from "react";
import calculateTime from "../../utils/calculateTime";
import { useDispatch, useSelector } from "react-redux";
import { playPause, setActiveSong } from "../../redux/user/playerSlice";
import IconHeartToggle from "../../components/icons/IconHeartToggle";
import axios from "axios";
import { IconPlayToggle } from "../../components/icons";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import TrackPanel from "./TrackPanel";

// const centerClass = "flex justify-center";
// const panelItemClass = "px-10 block py-2 hover:bg-alpha-bg cursor-pointer";

const TrackItem = ({ song, isPlaying, activeSong, data, i }) => {
  const token = useSelector((state) => state.auth.login.currentUser.jwt);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (!event.target.matches("svg")) setShowPanel(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      // setShowPanel(true);
    };
  }, [ref]);

  const handleShowPanel = () => {
    setShowPanel(true);
  };
  console.log(showPanel);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handleToggleLikeTrack = async (song) => {
    if (!liked) {
      await axios.put(`http://localhost:3000/user/like/${song._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.put(`http://localhost:3000/user/unlike/${song._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    setLiked(!liked);
  };
  // const SetCurrentSong;
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  return (
    <div className="grid grid-cols-5 gap-16 text-white bg-[hsla(0,1%,20%,0.8)] px-4 py-2 items-center rounded-md mb-2">
      <div className="flex items-center gap-3">
        <span>
          <IconPlayToggle played={true}></IconPlayToggle>
        </span>
        <div className="flex flex-col">
          <h3 className="">{song.title || "unknown"}</h3>
          <Link
            to={`/artists/${song.artist._id}`}
            className="text-xs hover:text-secondary"
          >
            {song.artist.username}
          </Link>
        </div>
      </div>
      <p className="text-sm text-center text-lime-50">
        {calculateTime("2022-6-14")}
      </p>
      <p className="text-sm text-center">1:21</p>
      <span className="flex justify-center select-none">
        <IconHeartToggle
          liked={liked}
          onClick={() => handleToggleLikeTrack(song, token)}
        ></IconHeartToggle>
      </span>
      <div className="relative flex justify-end gap-3">
        <span className="cursor-pointer" onClick={handleShowPanel}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2z"
            />
          </svg>
        </span>
        <TrackPanel nodeRef={ref} show={showPanel}></TrackPanel>
      </div>
    </div>
  );
};

export default TrackItem;
