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
    title: "Subscribe",
    icon: <IconUser></IconUser>,
    url: "/subscribe",
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
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="m13.087 21.388l.542-.916c.42-.71.63-1.066.968-1.262c.338-.197.763-.204 1.613-.219c1.256-.021 2.043-.098 2.703-.372a5 5 0 0 0 2.706-2.706C22 14.995 22 13.83 22 11.5v-1c0-3.273 0-4.91-.737-6.112a5 5 0 0 0-1.65-1.651C18.41 2 16.773 2 13.5 2h-3c-3.273 0-4.91 0-6.112.737a5 5 0 0 0-1.651 1.65C2 5.59 2 7.228 2 10.5v1c0 2.33 0 3.495.38 4.413a5 5 0 0 0 2.707 2.706c.66.274 1.447.35 2.703.372c.85.015 1.275.022 1.613.219c.337.196.548.551.968 1.262l.542.916c.483.816 1.69.816 2.174 0ZM7.5 9.715c0 1.752 2.163 3.615 3.49 4.593c.454.335.681.502 1.01.502c.329 0 .556-.167 1.01-.502c1.327-.978 3.49-2.84 3.49-4.593c0-2.677-2.475-3.677-4.5-1.609c-2.025-2.068-4.5-1.068-4.5 1.609Z"
          clipRule="evenodd"
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
