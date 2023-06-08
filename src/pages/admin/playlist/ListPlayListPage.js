import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlaylists } from "../../../redux/apiRequest";
import { NavLink } from "react-router-dom";

const ListPLaylistPage = () => {
  const admin = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const listPlaylist = useSelector(
    (state) => state.playlist.playlists?.allPlaylists
  );
  useEffect(() => {
    getAllPlaylists(admin?.data?.admin_token, dispatch);
  }, []);
  localStorage.setItem("token", admin?.data?.admin_token);
  return (
    <>
      <div>
        {listPlaylist &&
          listPlaylist.map((item) => (
            <div key={item._id}>
              {item.title}
              <button>
                <NavLink to={`/playlists/${item._id}`}>Detail</NavLink>
              </button>
            </div>
          ))}
      </div>
      {/* <LayoutModal
        heading="Playlist information"
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <p>Username: {ad.username}</p>
        <p>First Name: {ad.firstName}</p>
        <p>Last Name: {ad.lastName}</p>
        <button>Reset password</button>
      </LayoutModal> */}
    </>
  );
};

export default ListPLaylistPage;
