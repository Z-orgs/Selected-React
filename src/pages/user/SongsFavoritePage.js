import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import TrackItem from "modules/track/TrackItem";
import { useDispatch, useSelector } from "react-redux";
import { getSongsLiked } from "redux/apiRequest";

const SongsFavoritePage = () => {
  const token = useSelector((state) => state.auth.login.currentUser.jwt);
  const songsLiked = useSelector((state) => state.songsLiked.songsLiked.data);
  console.log(songsLiked);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    getSongsLiked(token, dispatch);
  }, []);
  return (
    <div>
      {songsLiked && songsLiked.length > 0
        ? songsLiked.map((track) => (
            <TrackItem
              key={v4()}
              song={track}
              isLiked={songsLiked.includes(track)}
            ></TrackItem>
          ))
        : "Empty"}
    </div>
  );
};

export default SongsFavoritePage;
