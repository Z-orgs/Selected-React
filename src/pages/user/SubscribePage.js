import ArtistCard from "modules/artist/ArtistCard";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
const { default: axios } = require("api/axios");

const SubscribePage = () => {
  const token = useSelector((state) => state.auth.login.currentUser.jwt);
  const [ids, setIds] = useState([]);
  const [following, setFollowing] = useState(null);
  const [artists, setArtists] = useState([]);

  const getArtistFollowings = useCallback(async () => {
    const response = await axios.get("/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setFollowing(response.data.following);
  }, [token]);

  const getInfoArtist = useCallback(
    async (idArtist) => {
      const response = await axios.get(`/artist/artist/${idArtist}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    [token]
  );

  useEffect(() => {
    if (following !== null) {
      setIds(following);
    }
  }, [following]);

  useEffect(() => {
    async function fetchData() {
      await getArtistFollowings();
    }
    fetchData();
  }, [getArtistFollowings]);

  useEffect(() => {
    async function fetchData() {
      const artistss = await Promise.all(ids.map((id) => getInfoArtist(id)));
      setArtists(artistss);
    }
    fetchData();
  }, [ids, getInfoArtist]);

  console.log(artists);
  return (
    <div className="grid grid-cols-5 gap-4">
      {artists.length > 0 &&
        artists.map((artist) => (
          <div key={v4()} className="p-4 bg-alpha-bg">
            <ArtistCard idArtist={artist.artist._id}></ArtistCard>
          </div>
        ))}
    </div>
  );
};

export default SubscribePage;
{
  /* <div key={v4()}>
            <img
              src={
                artist.artist.profileImage
                  ? `${process.env.REACT_APP_API}/file/${artist.artist.profileImage}`
                  : "/avt.jpg"
              }
              alt=""
            />
          </div> */
}
