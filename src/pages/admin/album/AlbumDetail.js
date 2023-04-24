import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

const AlbumDetail = () => {
    const [album, setAlbum] = useState({});
    const { slug } = useParams();
    const ad = useSelector((state) => state.auth.login?.currentUser);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/admin/album/${slug}`, {
                headers: { Authorization: `Bearer ${ad?.data?.admin_token}` },
            })
            .then((response) => {
                setAlbum(response.data);
            });
        console.log(album);
    }, [slug]);
    return (
        <>
            <div>
                {album.title}
                <br></br>
                {album.artist}
                {album.tracks &&
                    album.tracks.map((item) => {
                        return (
                            <div key={item._id}>
                                {item.title}
                                <br></br>
                                <audio
                                    controls
                                    src={item.link}
                                ></audio>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default AlbumDetail;
