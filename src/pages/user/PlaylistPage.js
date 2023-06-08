import React, { useEffect, useState } from "react";
import AlbumGrid from "modules/album/AlbumGrid";
import GridView from "components/common/GridView";
import AlbumItem from "modules/album/AlbumItem";
import Modal from "components/modal/Modal";
import { useSelector } from "react-redux";
import { Label } from "components/label";
import { Input } from "components/input";
import { Button } from "components/button";
import { createPlaylistUser } from "redux/apiRequest";

const { default: axios } = require("api/axios");

const PlaylistPage = () => {
  const token = useSelector((state) => state.auth.login.currentUser.jwt);
  const [showModal, setShowModal] = useState(false);
  const [namePlaylist, setNamePlaylist] = useState("");
  const [playlists, setPlaylists] = useState([]);
  // const title = "hehe";
  const getAllPlaylists = async () => {
    await axios
      .get("/playlist", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setPlaylists(response.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllPlaylists();
  }, []);

  return (
    <div className="py-2">
      <GridView>
        <div
          className="flex flex-col items-center justify-center text-white w-[290px] border-2 border-[hsla(0,0%,100%,0.1)] rounded-md hover:text-secondary cursor-pointer group gap-3 text-lg transition-all"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <span className="w-16">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="{32}"
              height="{32}"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"
                className="group-hover:fill-secondary"
              />
            </svg> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="w-16 h-16 transition-all group-hover:stroke-secondary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          Add a new playlist
        </div>
        {playlists.map((playlist) => (
          <AlbumItem
            isPlaylist={true}
            id={playlist._id}
            title={playlist.title}
          ></AlbumItem>
        ))}
        <AlbumItem></AlbumItem>
        <AlbumItem></AlbumItem>
        <AlbumItem></AlbumItem>
        <AlbumItem></AlbumItem>
        <AlbumItem></AlbumItem>
        <AlbumItem></AlbumItem>
      </GridView>
      <Modal
        show={showModal}
        heading="Create Playlist"
        onClose={() => setShowModal(false)}
      >
        <Label>Name playlist: </Label>
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setNamePlaylist(e.target.value)}
        />
        <Button
          type="submit"
          onClick={() => createPlaylistUser(namePlaylist, token)}
        >
          Create
        </Button>
      </Modal>
    </div>
  );
};

export default PlaylistPage;
