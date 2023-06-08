import React, { useEffect, useRef, useState } from "react";
import calculateTime from "utils/calculateTime";
import { useDispatch, useSelector } from "react-redux";
import IconHeartToggle from "components/icons/IconHeartToggle";
import { IconPlayToggle } from "components/icons";
import { Link } from "react-router-dom";
import TrackPanel from "./TrackPanel";
import { playPause, setPlaylist } from "redux/user/playerSlice";

const { default: axios } = require("api/axios");

// const centerClass = "flex justify-center";
// const panelItemClass = "px-10 block py-2 hover:bg-alpha-bg cursor-pointer";

const TrackItem = ({
  song,
  isPlaying = false,
  activeSong,
  data,
  i,
  isLiked,
}) => {
  const playPlayer = useSelector((state) => state.player.isPlaying);
  const currentSong = useSelector(
    (state) => state.player.tracks[state.player.currentTrackIndex]
  );
  activeSong = song?._id === currentSong?._id;
  if (activeSong) isPlaying = playPlayer;
  // console.log(isLiked);
  const token = useSelector((state) => state.auth.login.currentUser.jwt);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(isLiked);
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
  // console.log(showPanel);
  // const handlePauseClick = () => {
  //   dispatch(playPause(false));
  // };
  const handleToggleLikeTrack = async (song) => {
    if (!liked) {
      await axios.put(
        `/user/like/${song._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } else {
      await axios.put(
        `/user/unlike/${song._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
    setLiked(!liked);
  };
  const handlePlayClick = () => {
    if (isPlaying) {
      dispatch(playPause(false));

      isPlaying = false;
    } else {
      if (song?._id !== currentSong?._id) dispatch(setPlaylist([song]));
      dispatch(playPause(true));
      isPlaying = true;
    }
  };

  return (
    // bg-[hsla(0,1%,20%,0.8)]
    <div
      className={`grid items-center grid-cols-6 gap-16 px-4 py-2 mb-2 text-white border-b border-[rgba(225,225,225,0.2)] rounded-md hover:bg-[#ffffff1a] ${
        activeSong ? "bg-[#ffffff1a]" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="cursor-pointer" onClick={() => handlePlayClick()}>
          <IconPlayToggle playing={isPlaying}></IconPlayToggle>
        </span>
        <div className="flex flex-col">
          <h3 className="">{song.title || "unknown"}</h3>
          <Link
            to={`/artists/${song.artist._id}`}
            className="text-xs hover:text-secondary"
          >
            {song.artist.username || song.artist}
          </Link>
        </div>
      </div>
      <p className="text-xs text-center text-lime-50">
        {calculateTime("2022-6-14")}
      </p>
      <div className="flex items-center gap-1 pl-[50%] -translate-x-2/4">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9zM7 15v4H5v-4h2zm12 4h-2v-4h2v4z"
            />
          </svg>
        </span>
        {song.listens}
      </div>
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
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2z"
            />
          </svg>
        </span>
        <TrackPanel song={song} nodeRef={ref} show={showPanel}></TrackPanel>
      </div>
    </div>
  );
};

export default TrackItem;
