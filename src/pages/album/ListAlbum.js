import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAlbums } from "../../redux/apiRequest";
import { NavLink } from 'react-router-dom';

const ListAlbumPage = () => {
    const admin = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const listAlbum = useSelector((state) => state.album.albums?.allAlbums);
    useEffect(() => {
        getAllAlbums(admin?.data?.admin_token, dispatch);
    }, []);
    localStorage.setItem("token", admin?.data?.admin_token);
    return (
        <>
            <div>
                {listAlbum &&
                    listAlbum.map((item) => (
                        <div key={item._id}>
                            {item.title}
                            <button>
                                <NavLink to={`/album/${item._id}`}>Detail</NavLink>
                            </button>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default ListAlbumPage;