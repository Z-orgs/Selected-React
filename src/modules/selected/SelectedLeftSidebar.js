import React from "react";
import {
  IconAlbum,
  IconLogout,
  IconPlaylist,
  IconUser,
} from "../../components/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { clearPlaylist } from "../../redux/user/playerSlice";

const itemClass =
  "flex py-2 px-6 items-center w-full gap-2 text-lg font-semibold text-white";

const sidebarLinks = [
  {
    title: "Home",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
      </svg>
    ),
    url: "/",
  },
  // {
  //   title: "Albums",
  //   icon: <IconAlbum className="fill-white w-[24px] h-[24px]"></IconAlbum>,
  //   url: "/albums/64579d7eb680077a8e37169b",
  // },
  {
    title: "Subrice",
    icon: <IconUser></IconUser>,
    url: "/artists/64579beab680077a8e371679",
  },
  {
    title: "Playlist",
    icon: (
      <IconPlaylist className="fill-white w-[24px] h-[24px]"></IconPlaylist>
    ),
    url: "/playlists",
  },
  {
    title: "Song favorite",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.4"
          d="M11.776 21.8374C9.49292 20.4273 7.37062 18.7645 5.44789 16.8796C4.0905 15.5338 3.05386 13.8905 2.41716 12.0753C1.27953 8.53523 2.60381 4.48948 6.30111 3.2884C8.25262 2.67553 10.375 3.05175 12.007 4.29983C13.6396 3.05315 15.7614 2.67705 17.713 3.2884C21.4103 4.48948 22.7435 8.53523 21.6058 12.0753C20.9743 13.8888 19.9438 15.5319 18.5929 16.8796C16.6684 18.7625 14.5463 20.4251 12.2648 21.8374L12.0159 22L11.776 21.8374Z"
          fill="white"
        />
        <path
          d="M12.0109 22L11.776 21.8374C9.49013 20.4274 7.36487 18.7647 5.43902 16.8796C4.0752 15.5356 3.03238 13.8922 2.39052 12.0753C1.26177 8.53523 2.58605 4.48948 6.28335 3.2884C8.23486 2.67553 10.3853 3.05204 12.0109 4.31057V22Z"
          fill="white"
        />
        <path
          d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z"
          fill="white"
        />
      </svg>
    ),
    url: "/songs-favorite",
  },
];

const SelectedLeftSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearPlaylist());
    navigate("/");
  };
  return (
    <div className="w-[240px] bg-[hsla(0,0%,100%,0.05)] flex flex-col items-center">
      <Link to="/" className="my-4">
        <img srcSet="/logoWithoutText.png 2x" alt="" />
      </Link>
      {sidebarLinks.map((link) => (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${itemClass} bg-[#ffffff1a] border-l-4 border-secondary`
              : `${itemClass}`
          }
          to={link.url}
          key={v4()}
        >
          <span className="">{link.icon}</span>
          {link.title}
        </NavLink>
      ))}
      <div>
        <span
          onClick={handleLogout}
          className="block p-2 bg-white rounded-full cursor-pointer shadow-[rgba(60,_64,_67,_0.3)_0px_1px_2px_0px,_rgba(60,_64,_67,_0.15)_0px_2px_6px_2px]"
        >
          <IconLogout className="fill-black h-[26px] w-[26px]"></IconLogout>
        </span>
      </div>
    </div>
  );
};

export default SelectedLeftSidebar;
