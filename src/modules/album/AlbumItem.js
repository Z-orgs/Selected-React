import React from "react";
import "./Album.css";
import { Link } from "react-router-dom";

const AlbumItem = ({ thumb, title, id, keyProp }) => {
  return (
    <div className="w-[290px]" key={keyProp}>
      <Link
        to={`/albums/${id}`}
        className="relative mb-2 overflow-hidden rounded-md cursor-pointer select-none group max-h-[290px] block bg-[#eee]"
      >
        <img
          className="w-full duration-500 ease-in group-hover:scale-110"
          src={
            thumb
              ? `http://localhost:3000/file/${thumb}`
              : "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/b/d/f/4/bdf46d5caf0e60100052b74d06f4e3ea.jpg"
          }
          alt=""
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 z-2 bg-[rgba(0,_0,_0,_0.3)] flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
              />
            </svg>
          </span>
        </div>
      </Link>
      <h3 className="text-base font-semibold text-white cursor-pointer">
        {title || "Âm nhạc nạp vitamin tích cực cho bạn mỗi ngày"}
      </h3>
    </div>
  );
};

export default AlbumItem;
