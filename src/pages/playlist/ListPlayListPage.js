import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlaylists } from "../../redux/apiRequest";
import { NavLink } from 'react-router-dom';

const ListPLaylistPage = () => {
    const admin = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const listPlaylist = useSelector((state) => state.playlist.playlists?.allPlaylists);
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
                                <NavLink to={`/playlist/${item._id}`}>Detail</NavLink>
                            </button>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default ListPLaylistPage;