import React, { useState, useRef, useEffect } from "react";
import Slider from "rc-slider";
import { IconPlayToggle } from "components/icons";
import { useDispatch, useSelector } from "react-redux";
import useGenerateTrack from "hooks/useGenerateTrack";
import "./Player.scss";
import {
  nextTrack,
  playPause,
  playTrack,
  prevTrack,
  setVolume,
} from "redux/user/playerSlice";
import getDurationAudio from "utils/getDurationAudio";
import axios from "api/axios";
import formatDuration from "utils/formatDuration";
// import "rc-slider/assets/index.css";

const Player = () => {
  const audioRef = useRef();
  const [audioIndex, setAudioIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMute, setIsMute] = useState(false);
  const player = useSelector((state) => state.player);
  const [currentVolume, setCurrentVolume] = useState(100);
  const audios = player.tracks;
  const [isPlay, setPlay] = useState(false);
  // const { setSongs, audioUrl } = useGenerateTrack(audios);
  const [songs, setSongs] = useState(audios);
  const dispatch = useDispatch(audios);
  const token = useSelector((state) => state.auth.login.currentUser.jwt);
  const index = useSelector((state) => state.player.currentTrackIndex);
  // setSongs(player.tracks);

  useEffect(() => {
    setSongs(player?.tracks);
    setPlay(player.isPlaying);
    // playPause(true);
    if (!player.isPlaying) audioRef.current.pause();
    else audioRef.current.play();
  }, [player]);

  const handleLoadedData = (id) => {
    axios
      .get(`/track/info/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDuration(res.data.duration))
      .catch((err) => console.log(err));
    // setDuration(audioRef.current.duration);
    if (isPlay) audioRef.current.play();
  };

  const handlePausePlayClick = () => {
    if (isPlay) {
      audioRef.current.pause();
      // dispatch(playPause(false));
    } else {
      audioRef.current.play();
      // dispatch(playPause(true));
    }
    setPlay(!isPlay);
    dispatch(playPause(!isPlay));
  };

  const handleTimeSliderChange = (value) => {
    audioRef.current.currentTime = value;
    setCurrentTime(value);
    if (!isPlay) {
      setPlay(true);
      console.log(isPlay);
      audioRef.current.play();
    }
    console.log(value);
  };
  // console.log(currentTime);
  const handleVolumeSliderChange = (value) => {
    const volume = value / 100;
    audioRef.current.volume = volume;
    setCurrentVolume(value);
    dispatch(setVolume(value));
  };
  // console.log(audioRef.current.src);

  return (
    <div className="bg-[rgba(0,0,0,0.5)] flex items-center text-white justify-between p-4 w-full h-full">
      <div className="flex items-center gap-3 w-[32%]">
        <img
          className="Song-Thumbnail w-[80px] rounded-md"
          src="/logoWithoutText.png"
          alt="tet"
        />
        <div>
          <h2 className="Song-Title">
            {audios[audioIndex]?.title || "No songs are playing"}
          </h2>
          <p className="Singer">{audios[audioIndex]?.artist?.nickName || ""}</p>
        </div>
      </div>

      {/* Control-Button-Group Wrapper */}
      <div className="w-[36%]">
        <div className="flex items-center justify-center gap-4 mb-2">
          <div
            className="Prev-Button"
            onClick={() => {
              setAudioIndex((audioIndex - 1) % audios.length);
              dispatch(prevTrack());
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={32}
              height={32}
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </div>
          <div
            className="p-1 bg-white rounded-full Pause-Play-Button"
            onClick={handlePausePlayClick}
          >
            <IconPlayToggle
              hover={false}
              currentColor={"black"}
              playing={isPlay}
            ></IconPlayToggle>
          </div>
          <div
            className="Next-Button"
            onClick={() => {
              setAudioIndex((audioIndex + 1) % audios.length);
              dispatch(nextTrack());
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={32}
              height={32}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"
              />
            </svg>
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
          src={
            `${process.env.REACT_APP_API}/file/${songs[index]?.fileId}` || ""
          }
          onLoadedData={() => handleLoadedData(songs[index]?._id)}
          onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
          onEnded={() => setPlay(false)}
        />
      </div>
      <div className="flex items-center gap-4 select-none w-[32%] justify-end">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={22}
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M2.75 5a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H2.75ZM2 10.75a.75.75 0 0 1 .75-.75h9.587a5.53 5.53 0 0 0-1.447 1.5H2.75a.75.75 0 0 1-.75-.75ZM2.75 15h7.272a5.47 5.47 0 0 0 .353 1.5H2.75a.75.75 0 0 1 0-1.5ZM20 14.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0Zm-2.287-.437l-2.97-1.65a.5.5 0 0 0-.743.437v3.3a.5.5 0 0 0 .743.437l2.97-1.65a.5.5 0 0 0 0-.874Z"
            />
          </svg>
        </div>
        <div className="flex items-center gap-2">
          <div>
            {currentVolume <= 70 && currentVolume > 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={22}
                height={22}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M14.704 3.442c.191.226.296.512.296.808v15.502a1.25 1.25 0 0 1-2.058.954L7.975 16.5H4.25A2.25 2.25 0 0 1 2 14.25v-4.5A2.25 2.25 0 0 1 4.25 7.5h3.725l4.968-4.204a1.25 1.25 0 0 1 1.761.147Zm2.4 5.198a.75.75 0 0 1 1.03.25c.574.94.862 1.992.862 3.14c0 1.149-.288 2.201-.862 3.141a.75.75 0 1 1-1.28-.781c.428-.702.642-1.483.642-2.36c0-.876-.214-1.657-.642-2.359a.75.75 0 0 1 .25-1.03Z"
                />
              </svg>
            )}
            {currentVolume === 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={22}
                height={22}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M15 4.25c0-1.078-1.274-1.65-2.08-.934L8.427 7.31a.75.75 0 0 1-.498.19H4.25A2.25 2.25 0 0 0 2 9.75v4.497a2.25 2.25 0 0 0 2.25 2.25h3.68a.75.75 0 0 1 .498.19l4.491 3.993c.806.717 2.081.145 2.081-.934V4.25Zm1.22 4.97a.75.75 0 0 1 1.06 0L19 10.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L20.06 12l1.72 1.72a.75.75 0 1 1-1.06 1.06L19 13.062l-1.72 1.72a.75.75 0 1 1-1.06-1.06L17.94 12l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                />
              </svg>
            )}
            {currentVolume > 70 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={22}
                height={22}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M15 4.25v15.496c0 1.079-1.274 1.651-2.08.934l-4.492-3.994a.75.75 0 0 0-.498-.189H4.25A2.25 2.25 0 0 1 2 14.247V9.749A2.25 2.25 0 0 1 4.25 7.5h3.68a.75.75 0 0 0 .498-.19l4.491-3.993C13.726 2.6 15 3.172 15 4.25Zm3.992 1.648a.75.75 0 0 1 1.049.156A9.959 9.959 0 0 1 22 12.001a9.96 9.96 0 0 1-1.96 5.946a.75.75 0 0 1-1.205-.893a8.459 8.459 0 0 0 1.665-5.053a8.459 8.459 0 0 0-1.665-5.054a.75.75 0 0 1 .157-1.05ZM17.143 8.37a.75.75 0 0 1 1.017.302c.536.99.84 2.125.84 3.329a6.973 6.973 0 0 1-.84 3.328a.75.75 0 0 1-1.32-.714a5.48 5.48 0 0 0 .66-2.614c0-.948-.24-1.838-.66-2.615a.75.75 0 0 1 .303-1.016Z"
                />
              </svg>
            )}
          </div>
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
    </div>
  );
};

export default Player;
