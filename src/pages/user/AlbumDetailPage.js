import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import TrackItem from "modules/track/TrackItem";
import generateImg from "utils/generateImg";
import calculateTime from "utils/calculateTime";
import { IconPlayToggle } from "components/icons";
import { playPause, setPlaylist } from "redux/user/playerSlice";

const { default: axios } = require("api/axios");

const AlbumDetailPage = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const token = user.jwt;
  const [data, setData] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const isPlay = useSelector((state) => state.player.issPlaying);

  useEffect(() => {
    const fetchAlbum = () => {
      axios
        .get(`/album/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setData(res.data));
    };
    fetchAlbum();
  }, []);

  console.log(data);
  const handlePlayAlbum = () => {
    dispatch(setPlaylist(data.tracks));
    dispatch(playPause(!isPlay));
  };
  return (
    <div
      className=""
      // style={{
      //   backgroundImage: "url(/thumb.png)",
      //   backgroundSize: "cover",
      //   WebkitMaskImage:
      //     "-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))",
      // }}
    >
      {/* <div
        className="absolute top-0 bottom-0 left-0 right-0 opacity-70 -z-1"
        style={{
          backgroundImage: "url(/thumb.png)",
          backgroundSize: "cover",
          WebkitMaskImage:
            "-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))",
        }}
      ></div> */}
      {/* <img src="" alt="" /> */}
      {Object.keys(data).length === 0 ? (
        "Loading..."
      ) : (
        <div className="">
          <div className="flex items-center gap-4">
            <div className="w-[290px]">
              <img
                className="w-full rounded-md"
                // src={`/file/${data.coverArtUrl}`}
                src={generateImg(data.coverArtUrl) || "/thumb.png"}
                alt=""
              />
            </div>
            <div className="text-white">
              <h3 className="text-4xl font-semibold">
                {data.title || "Tomorow's tunes"}
              </h3>
              <p>{`${
                data.tracks.filter((track) => track !== null).length
              } songs - ${calculateTime(data.release)}`}</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus, aliquid dicta? Porro sapiente numquam odio a?
              </p>
              <div>
                <span
                  className="flex items-center justify-center rounded-full bg-primary w-[60px] h-[60px]"
                  onClick={handlePlayAlbum}
                >
                  <IconPlayToggle></IconPlayToggle>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            {data.tracks
              .filter((track) => track !== null)
              .map((track) =>
                track === null ? (
                  ""
                ) : (
                  <TrackItem key={v4()} song={track}></TrackItem>
                )
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumDetailPage;
