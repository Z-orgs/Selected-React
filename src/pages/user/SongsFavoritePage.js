import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import TrackItem from "../../modules/track/TrackItem";
import axios from "axios";
import { useSelector } from "react-redux";

const SongsFavoritePage = () => {
  const token = useSelector((state) => state.auth.login.currentUser.jwt);
  const [data, setData] = useState([]);
  const getTracksLiked = async () => {
    await axios
      .get("http://localhost:3000/user/likes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getTracksLiked();
  }, []);
  return (
    <div>
      {data?.NoFollowing?.randomTracksNF.map((track) => (
        <TrackItem key={v4()} song={track}></TrackItem>
      ))}
    </div>
  );
};

export default SongsFavoritePage;
