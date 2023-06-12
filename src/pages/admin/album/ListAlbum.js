import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAlbums } from "redux/apiRequest";
import AlbumGrid from "modules/album/AlbumGrid";
import AlbumItem from "modules/album/AlbumItem";

const ListAlbumPage = () => {
  const admin = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const listAlbum = useSelector((state) => state.album.albums?.allAlbums);
  useEffect(() => {
    getAllAlbums(admin?.admin_token, dispatch);
  }, []);
  localStorage.setItem("token", admin?.admin_token);
  return (
    <div className="max-h-[96vh] overflow-auto  rounded-lg pl-6 py-4 text-black ">
      <AlbumGrid>
        {listAlbum &&
          listAlbum.map((item) => (
            <AlbumItem
              thumb={`${process.env.REACT_APP_API}/file/${item.coverArtUrl}`}
              size="250"
              title={item.title}
              key={item._id}
              id={item._id}
            ></AlbumItem>
          ))}
      </AlbumGrid>
    </div>
  );
};

export default ListAlbumPage;
