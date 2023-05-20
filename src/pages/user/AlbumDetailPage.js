import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import TrackItem from "../../modules/track/TrackItem";

const AlbumDetailPage = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const token = user.jwt;
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchAlbum = () => {
      axios
        .get(`http://localhost:3000/album/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setData(res.data));
    };
    fetchAlbum();
  }, []);
  console.log(data);
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
        <div>
          <div className="flex items-center gap-4">
            <div className="w-[290px]">
              <img
                className="w-full"
                // src={`http://localhost:3000/file/${data.coverArtUrl}`}
                src="/thumb.png"
                alt=""
              />
            </div>
            <div className="text-white">
              <h3 className="text-4xl font-semibold">Tomorow's tunes</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus, aliquid dicta? Porro sapiente numquam odio a?
              </p>
              <p>64 songs ~ 16hours+</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            {data.tracks.map((track) =>
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
