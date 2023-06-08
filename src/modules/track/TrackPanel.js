import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import Modal from "components/modal/Modal";
import { Label } from "components/label";
import { Button } from "components/button";
import { createPlaylistUser } from "redux/apiRequest";

const { default: axios } = require("api/axios");

const panelItemClass = "px-10 block py-2 hover:bg-alpha-bg cursor-pointer";
const TrackPanel = ({ song, show, nodeRef }) => {
  const [showModal, setShowModal] = useState(false);
  const [namePlaylist, setNamePlaylist] = useState("");
  const token = useSelector((state) => state.auth.login.currentUser.jwt);

  const [playlists, setPlaylists] = useState({});
  const getPlaylistsUser = async () => {
    const res = await axios.get("/playlist", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPlaylists(res.data);
    // console.log(res);
  };
  const addTrackToPlaylist = async (trackId, playlistId) => {
    await axios
      .put(
        `/playlist/add/${playlistId}`,
        {
          trackId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        toast.success("Add track success!");
      })
      .catch((err) => toast.error("Add failed!"));
  };

  useEffect(() => {
    getPlaylistsUser(token);
  }, []);
  // console.log(show);
  return (
    <div>
      <ul
        ref={nodeRef}
        className={`${
          show ? "flex" : "hidden"
        } absolute bottom-0 right-0 flex-col list-none rounded-md bg-primary z-[99999999999] min-w-[220px]`}
      >
        <li className="relative group">
          <Link className={`${panelItemClass}`} to="#">
            Thêm vào playlist
            <span className="absolute right-3 top-2/4 -translate-y-2/4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9.4 18L8 16.6l4.6-4.6L8 7.4L9.4 6l6 6l-6 6Z"
                />
              </svg>
            </span>
          </Link>
          <div className="top-0 absolute w-full rounded-md hidden bg-primary -left-[calc(100%-4px)] shadow-shadow-r list-none group-hover:block overflow-hidden">
            <div
              onClick={() => {
                setShowModal(true);
              }}
              className={`${panelItemClass} flex border-b border-alpha-bg gap-2 items-center`}
            >
              <span className="p-[2px] rounded-md bg-secondary-gradient">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={18}
                    strokeDashoffset={18}
                    strokeLinecap="round"
                    strokeWidth={2}
                  >
                    <path d="M12 5V19">
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.4s"
                        dur="0.3s"
                        values="18;0"
                      />
                    </path>
                    <path d="M5 12H19">
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="0.3s"
                        values="18;0"
                      />
                    </path>
                  </g>
                </svg>
              </span>
              New playlist
            </div>
            <ul className="overflow-auto list-none min-h-[120px] min-w-[180px]">
              {playlists && playlists.length > 0 ? (
                playlists.map((playlist) => (
                  <li
                    key={v4()}
                    onClick={() => addTrackToPlaylist(song._id, playlist._id)}
                    className={`${panelItemClass} flex gap-2 items-center`}
                  >
                    <span className="p-[2px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                        viewBox="0 0 48 48"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth={4}
                        >
                          <path strokeLinecap="round" d="M29 6v29" />
                          <path d="M15 36.04A5.04 5.04 0 0 1 20.04 31H29v5.96A5.04 5.04 0 0 1 23.96 42h-3.92A5.04 5.04 0 0 1 15 36.96v-.92Z" />
                          <path
                            strokeLinecap="round"
                            d="m29 14.066l12.883 3.056V9.013L29 6v8.066Z"
                            clipRule="evenodd"
                          />
                          <path
                            strokeLinecap="round"
                            d="M6 8h14M6 16h14M6 24h10"
                          />
                        </g>
                      </svg>
                    </span>
                    {playlist.title}
                  </li>
                ))
              ) : (
                <div className="m-auto">Empty</div>
              )}
            </ul>
          </div>
        </li>
        <li>
          <Link className={panelItemClass} to="#">
            Thêm vào playlist
          </Link>
        </li>
        <li>
          <Link className={panelItemClass} to="#">
            Thêm vào playlist
          </Link>
        </li>
      </ul>
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

export default TrackPanel;
