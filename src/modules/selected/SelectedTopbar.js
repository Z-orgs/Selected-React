import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import useSearch from "hooks/useSearch";
import { debounce } from "lodash";
import useOnChange from "hooks/useOnChange";
import { v4 } from "uuid";

const { default: axios } = require("api/axios");

const SelectedTopbar = ({ sticky }) => {
  const navigate = useNavigate();
  const navButtonClass = "p-3 bg-[rgba(0,0,0,0.4)] rounded-full cursor-pointer";
  const user = useSelector((state) => state.auth.login.currentUser);
  const { setUrl, data } = useSearch("", {});
  const [originalDomain, setOriginalDomain] = useState(
    window.location.hostname
  );
  const handleOnchange = debounce((e) => {
    if (e.target.value !== "") setUrl(`/search?keyword=${e.target.value}`);
    else setUrl("");
  }, 300);
  console.log(typeof data);
  const canGoBack = () => {
    return window.history.length > 1;
  };

  const canGoForward = () => {
    return window.history.length < window.history.state.index;
  };
  const handleGoBack = () => {
    // window.location.href.includes(window.lo)
    navigate(-1);
  };

  const handleGoForward = () => {
    // window.location.href.includes(window.lo)
    navigate(1);
  };

  return (
    <div
      className={`absolute left-0 right-0 z-50 flex items-center justify-between py-4 px-16 max-h-topbar-height transition-all ${
        sticky ? "bg-[#37075de3] backdrop-blur-2xl" : ""
      } mr-1`}
    >
      {/* <div className="absolute left-0 right-0 h-full -z-10 bg-bg-color bg-opacity-60 backdrop-blur-2xl"></div> */}
      <div className="flex gap-2">
        <div className="flex gap-2">
          <span
            onClick={handleGoBack}
            // disabled={!canGoBack()}
            className={`${navButtonClass} ${
              !canGoBack() ? "cursor-default bg-[rgba(0,0,0,0.3)]" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              fill="white"
              className="w-4 h-4"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
          </span>
          <span
            onClick={handleGoForward}
            // disabled={!canGoForward()}
            className={`${navButtonClass} ${
              !canGoForward() ? "cursor-default bg-[rgba(0,0,0,0.3)]" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              fill="white"
              className="w-4 h-4"
            >
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
          </span>
        </div>
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
      </div>
      <div className="cursor-pointer">
        <div className="max-w-[36px]">
          <img className="w-full rounded-full" src={user.data.picture} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SelectedTopbar;
