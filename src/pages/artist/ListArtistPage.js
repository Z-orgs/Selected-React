import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllArtist } from "../../redux/apiRequest";
import { NavLink } from 'react-router-dom';

const ListArtistPage = () => {
    const admin = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const listArtist = useSelector((state) => state.artist.artists?.allArtist);
    useEffect(() => {
        getAllArtist(admin?.data?.admin_token, dispatch);
    }, []);
    localStorage.setItem("token", admin?.data?.admin_token);
    return (
        <>
            <div>
                {listArtist &&
                    listArtist.map((art) => (
                        <div key={art._id}>
                            {art.username} - {art.nickName}
                        </div>
                    ))}
            </div>
            <div>
                <button>
                    <NavLink to={`/admin/create-artist`}>Create artist</NavLink>

                </button>
            </div>
        </>
    );
};

export default ListArtistPage;