import useSearch from "hooks/useSearch";
import { debounce } from "lodash";
import React, { useState } from "react";
import { v4 } from "uuid";

const LiveSearch = () => {
  const { setUrl, data } = useSearch("", {});
  const handleOnchange = debounce((e) => {
    if (e.target.value !== "") setUrl(`/search?keyword=${e.target.value}`);
    else setUrl("");
  }, 300);
  return (
    <div className="relative flex items-center w-[440px]">
      <input
        className={`outline-none bg-[hsla(0,0%,100%,0.1)] w-full rounded-full h-full px-4 py-2 text-white pl-10 focus:bg-[#200437]`}
        type="text"
        name=""
        id=""
        placeholder="Search..."
        onChange={handleOnchange}
      />
      <span className="absolute p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </span>

      {typeof data !== "string" && Object.keys(data).length > 0 && (
        <div className="absolute left-0 right-0 h-40 bg-[#200437] top-full text-white rounded-b-xl  px-4">
          <div className="w-6 h-6 bg-[#200437] absolute bottom-full left-0 -z-10"></div>
          <div className="w-6 h-6 bg-[#200437] absolute bottom-full right-0 -z-10"></div>
          {data?.tracks?.length > 0 && (
            <div className="border-t border-[rgba(255,255,255,0.2)]">
              {data.tracks.map((track) => (
                <div key={v4()}>{track.title}</div>
              ))}
            </div>
          )}
          {data?.artists?.length > 0 && (
            <div className="border-t border-[rgba(255,255,255,0.2)]">
              {data.artists.map((artist) => (
                <div key={v4()}>{artist.nickName}</div>
              ))}
            </div>
          )}
          {data?.albums?.length > 0 && (
            <div className="border-t border-[rgba(255,255,255,0.2)]">
              {data.albums.map((album) => (
                <div key={v4()}>{album.title}</div>
              ))}
            </div>
          )}
          {data?.playlists?.length > 0 && (
            <div className="border-t border-[rgba(255,255,255,0.2)]">
              {data.playlists.map((playlist) => (
                <div key={v4()}>{playlist.title}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveSearch;
