import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const { default: axios } = require("api/axios");

const PlaylistDetail = () => {
  const [playlist, setPlaylist] = useState({});
  const { slug } = useParams();
  const ad = useSelector((state) => state.auth.login?.currentUser);
  useEffect(() => {
    axios
      .get(`/admin/playlist/${slug}`, {
        headers: { Authorization: `Bearer ${ad?.data?.admin_token}` },
      })
      .then((response) => {
        setPlaylist(response.data);
      });
    console.log(playlist);
  }, [slug]);
  return (
    <>
      <div>
        {playlist.tracks &&
          playlist.tracks.map((item) => {
            return (
              <div key={item._id}>
                {item.title}
                <br></br>
                <audio controls src={item.link}></audio>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PlaylistDetail;
