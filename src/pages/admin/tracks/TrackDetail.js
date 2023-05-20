import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

const TrackDetail = () => {
    const [track, setTrack] = useState({});
    const { slug } = useParams();
    const ad = useSelector((state) => state.auth.login?.currentUser);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/admin/track/${slug}`, {
                headers: { Authorization: `Bearer ${ad?.data?.admin_token}` },
            })
            .then((response) => {
                setTrack(response.data);
            });
        console.log(track);
    }, [slug]);
    const handleApproveTrack = async () => {
        const res = await axios.put(`http://localhost:3000/track/approved/${slug}`,
            { id: slug },
            {
                headers: { Authorization: `Bearer ${ad?.data?.admin_token}` },
            });
        console.log(res);
    };
    return (
        <div>
            <audio
                controls
                src={track.link}
            ></audio>
            <button onClick={() => handleApproveTrack()}>
                Approve
            </button>
        </div>
    );
};

export default TrackDetail;