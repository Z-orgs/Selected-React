import React, { useState, useRef } from "react";
import Slider from "rc-slider";
import {
  IconNextSong,
  IconPlayToggle,
  IconPrevSong,
  IconSpeaker,
} from "components/icons";
import "./Player.scss";
import formatDuration from "utils/formatDuration";
import axios from "api/axios";
import { useSelector } from "react-redux";

const PlayerV2 = ({
  songs,
  index = 0,
  children,
  isPlaying = false,
  handlePlayPause,
}) => {
  const audioRef = useRef();
  const [audioIndex, setAudioIndex] = useState(index);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(100);
  const [isPlay, setPlay] = useState(false);
  const [track, setTrack] = useState({});
  const ad = useSelector((state) => state.auth.login?.currentUser);
  console.log(isPlaying);
  // const handleApproveTrack = async () => {
  //   const res = await axios.put(
  //     `/track/approved/${songs[index]._id}`,
  //     { id: songs[index]._id },
  //     {
  //       headers: { Authorization: `Bearer ${ad?.data?.admin_token}` },
  //     }
  //   );
  //   console.log(res);
  // };
  React.useEffect(() => {
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying]);
  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
    if (isPlaying) audioRef.current.play();
  };
  const handlePausePlayClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    // setPlay((prevIsPlaying) => !prevIsPlaying);
    handlePlayPause();
  };

  const handleTimeSliderChange = (value) => {
    audioRef.current.currentTime = value;
    setCurrentTime(value);
    // if (!isPlaying) {
    //   isPlaying = true;
    //   audioRef.current.play();
    // }
  };
  const handleVolumeSliderChange = (value) => {
    const volume = value / 100;
    audioRef.current.volume = volume;
    setCurrentVolume(value);
  };

  React.useEffect(() => {
    // setAudioIndex(index);
    axios
      .get(`/admin/track/${songs[index]._id}`, {
        headers: { Authorization: `Bearer ${ad?.data?.admin_token}` },
      })
      .then((response) => {
        setTrack(response.data);
      });
  }, [index]);
  return (
    <div
      className="relative flex flex-col items-center justify-center h-full p-4 text-white rounded-md bg-[rgba(0,0,0,0.6)]"
      style={{
        backgroundImage: "url('/wallpaper-2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "75% 75%",
      }}
    >
      <div className="flex flex-col items-center w-full gap-3 mb-4">
        <img
          className="w-[35%] rounded-md Song-Thumbnail"
          src="/logoWithoutText.png"
          alt="tet"
        />
        <div>
          <h2 className="p-1 text-white rounded-md">
            {songs[index]?.title || "No songs are playing"}
          </h2>
          <p className="Singer">{songs[index]?.artist?.nickName || ""}</p>
        </div>
      </div>

      {/* Control-Button-Group Wrapper */}
      <div className="w-full">
        <div className="flex items-center justify-center gap-4 mb-2">
          <div
            className="Prev-Button"
            onClick={() => {
              setAudioIndex((audioIndex - 1) % songs.length);
            }}
          >
            <IconPrevSong></IconPrevSong>
          </div>
          <div
            className="p-1 bg-white rounded-full Pause-Play-Button"
            onClick={handlePausePlayClick}
          >
            <IconPlayToggle
              hover={false}
              currentColor={"black"}
              playing={isPlaying}
            ></IconPlayToggle>
          </div>
          <div
            className="Next-Button"
            onClick={() => {
              setAudioIndex((audioIndex + 1) % songs.length);
            }}
          >
            <IconNextSong></IconNextSong>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p>{formatDuration(currentTime)}</p>
          <Slider
            className="my-slider"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleTimeSliderChange}
            handleStyle={{
              transform: "translateX(0)",
            }}
          />
          <p>{formatDuration(duration)}</p>
        </div>
        <audio
          ref={audioRef}
          src={track.link || ""}
          onLoadedData={handleLoadedData}
          onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
          onEnded={() => handlePlayPause()}
        />
      </div>
      <div className="flex items-center gap-4 select-none w-[32%] justify-center">
        <div className="flex items-center gap-2">
          <IconSpeaker currentVolume={currentVolume}></IconSpeaker>
          <Slider
            className="w-20"
            step={0.01}
            min={0}
            max={100}
            value={currentVolume}
            onChange={handleVolumeSliderChange}
            handleStyle={{
              transform: "translateX(0)",
            }}
          />
        </div>
      </div>
      {/* <button
        onClick={handleApproveTrack}
        className={`px-4 py-2 text-white rounded-md min-w-[120px] my-2 font-semibold block text-lg ${
          songs[index].status ? "bg-blue-400 text-gray-100" : "bg-blue-500"
        }`}
        disabled={songs[index].status}
      >
        {songs[index].status ? "Approved" : "Approve"}
      </button> */}
    </div>
  );
};

export default PlayerV2;
