import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ButtonFollowArtist from "components/button/ButtonFollowArtist";
import ArtistCard from "modules/artist/ArtistCard";
import GridView from "components/common/GridView";
import Heading from "components/common/Heading";
import { v4 } from "uuid";
import TrackItem from "modules/track/TrackItem";
import { followArtistToggle } from "redux/apiRequest";

const { default: axios } = require("api/axios");

const ArtistDetailPage = () => {
  const { id } = useParams();
  const [artists, setArtists] = useState([]);
  const [artist, setArtist] = useState({});
  const [tracks, setTracks] = useState([]);
  const [data, setData] = useState({});
  const [countFollower, setCountFollower] = useState(0);
  const token = useSelector((state) => state.auth.login.currentUser.jwt);
  const getArtist = async () => {
    await axios
      .get(`/artist/artist/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log(res);
        setTracks(res.data.tracks);
        setArtist(res.data.artist);
        setData(res.data);
        setCountFollower(res.data.artist.followers);
      })
      .catch((err) => console.log(err));
  };

  const getAllArtist = async () => {
    try {
      const res = await axios.get("/search", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      setArtists(res.data.artists);
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getArtist();

    getAllArtist();
  }, []);
  return (
    <div className="-mt-16">
      <div className="relative -pt-16 mb-8 pt-[135px] flex items-end">
        {/* background cover */}
        <div className="absolute top-0 bottom-0 overflow-hidden -left-28 -right-28">
          <div
            className="absolute h-full block top-0 bottom-0 left-0 right-0 blur-[50px]"
            style={{
              backgroundImage: `url('${
                artist.image ||
                "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/avatars/2/b/a/b/2babd228242022777078304ef90f7a3f.jpg"
              }')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
          <div className="absolute z-10 h-full block top-0 bottom-0 left-0 right-0 bg-[rgba(41,21,71,0.8)]"></div>
        </div>

        {/* Info Artist  */}
        <div className="relative z-20 flex items-end w-full h-full pb-6 flex-grow-[1] text-white">
          <div className="flex items-center flex-1 gap-8">
            <div className="w-[140px] h-[140px] rounded-full overflow-hidden">
              <img
                src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/2/b/a/b/2babd228242022777078304ef90f7a3f.jpg"
                alt=""
              />
            </div>
            <div>
              <h3 className="mb-4 text-5xl font-bold font-secondary">
                {artist.nickName || `${artist.firstName} ${artist.lastName}`}
              </h3>
              <div className="flex items-center gap-4">
                <p className="text-sm font-semibold">
                  {countFollower} followers
                </p>
                <ButtonFollowArtist
                  onClick={() => {
                    followArtistToggle(artist._id, token, data.followed);
                    setCountFollower(countFollower + 1);
                  }}
                  followed={data.followed}
                ></ButtonFollowArtist>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Heading>Tracks</Heading>
        {tracks.map((track) => (
          <TrackItem key={v4()} song={track}></TrackItem>
        ))}
      </div>
      <div>
        <Heading>You may also like</Heading>
        <GridView>
          {artists
            .filter((artist) => artist._id !== id)
            .slice(0, 5)
            .map((artist) => (
              <ArtistCard key={v4()} idArtist={artist._id}></ArtistCard>
            ))}
        </GridView>
      </div>
    </div>
  );
};

export default ArtistDetailPage;
