import React, { useEffect, useState } from "react";
import GridView from "components/common/GridView";
import AlbumItem from "modules/album/AlbumItem";
import Modal from "components/modal/Modal";
import { useSelector } from "react-redux";
import { Label } from "components/label";
import { Button } from "components/button";
import { createPlaylistUser } from "redux/apiRequest";
import LayoutForm from "layout/LayoutForm";
import FormGroup from "components/common/FormGroup";
import { v4 } from "uuid";

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
  console.log(playlists);
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
            key={v4()}
            isPlaylist={true}
            id={playlist._id}
            title={playlist.title}
            textColor="white"
          ></AlbumItem>
        ))}
      </GridView>
      <Modal
        show={showModal}
        heading="Create Playlist"
        onClose={() => setShowModal(false)}
      >
        <LayoutForm title="Create new playlist">
          <div className="flex flex-col gap-2">
            <FormGroup>
              <Label>Name: </Label>
              <input
                type="text"
                name=""
                className="input-text"
                id=""
                onChange={(e) => setNamePlaylist(e.target.value)}
              />
            </FormGroup>
            <Button
              type="submit"
              onClick={() => {
                createPlaylistUser(namePlaylist, token);
                setShowModal(!showModal);
              }}
            >
              Create
            </Button>
          </div>
        </LayoutForm>
      </Modal>
    </div>
  );
};

export default PlaylistPage;
