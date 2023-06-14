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
    <div className="flex gap-6">
      <div className="flex flex-col w-1/5 gap-2">
        <img
          className="object-cover w-full rounded-lg"
          src="/thumb-5.avif"
          alt=""
        />
        <h3 className="text-2xl font-semibold text-center text-white font-secondary">
          Songs favorite
        </h3>
        <div className="flex justify-center gap-2 text-white">
          <p>{songsLiked && songsLiked.length} songs ~</p>
          <p>
            {songsLiked?.length > 0 &&
              Math.floor(
                songsLiked.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.duration,
                  0
                ) / 60
              )}
            + minutes
          </p>
        </div>
      </div>
      <div className="flex-1">
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
    </div>
  );
};

export default SongsFavoritePage;
