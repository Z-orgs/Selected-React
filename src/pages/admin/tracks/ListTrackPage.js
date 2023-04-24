import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTracks } from "../../redux/apiRequest";
import { NavLink } from 'react-router-dom';

const ListTrackPage = () => {
    const admin = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const listTracks = useSelector((state) => state.track.tracks?.allTracks);
    useEffect(() => {
        getAllTracks(admin?.data?.admin_token, dispatch);
    }, []);
    localStorage.setItem("token", admin?.data?.admin_token);
    return (
        <>
            <div>
                {listTracks &&
                    listTracks.map((item) => (
                        <div key={item._id}>
                            {item.title} 	&nbsp;
                            <button>
                                <NavLink to={`/track/${item._id}`}>Detail</NavLink>
                            </button>

                        </div>
                    ))}
            </div>
        </>
    );
};

export default ListTrackPage;