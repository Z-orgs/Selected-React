import { getAllAlbumArtists, getAllTrackArtists } from "redux/apiRequest";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "components/modal/Modal";
import { NavLink } from "react-router-dom";

const { default: axios } = require("api/axios");

const ArtistAlbumPage = () => {
  const artist = useSelector((state) => state.auth.login?.currentUser);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const listAlbum = useSelector(
    (state) => state.albumArtist.albumArtists?.allAlbumArtists
  );
  const listTrack = useSelector(
    (state) => state.trackArtist.trackArtists?.allTrackArtists
  );
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    genre: "",
    release: "",
    isPublic: true,
    tracks: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Xử lý giá trị boolean của isPublic
    const inputValue = name === "isPublic" ? value === "true" : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: image,
    }));
  };

  useEffect(() => {
    getAllAlbumArtists(artist?.data?.artist_token, dispatch);
    getAllTrackArtists(artist?.data?.artist_token, dispatch);
  }, []);

  const handleCreateAlbum = async (e) => {
    e.preventDefault();

    const albumData = new FormData();
    albumData.append("image", formData.image);
    albumData.append("title", formData.title);
    albumData.append("genre", formData.genre);
    albumData.append("release", formData.release);
    albumData.append("isPublic", formData.isPublic);
    albumData.append(
      "tracks",
      JSON.stringify(selectedTracks.map((track) => track._id))
    );

    try {
      await axios.post("/album", albumData, {
        headers: {
          Authorization: `Bearer ${artist?.data?.artist_token}`,
        },
      });
      alert("Album created successfully!");
      console.log(albumData);
    } catch (error) {
      console.log(error);
      alert("Failed to create album. Please try again.");
    }
  };

  const handleTrackSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchResults(listTrack);
    } else {
      const filteredTracks = listTrack.filter((track) => {
        return track.title.toLowerCase().includes(term.toLowerCase());
      });

      setSearchResults(filteredTracks);
    }
  };

  const handleAddTrack = (track) => {
    setSelectedTracks((prevSelectedTracks) => [...prevSelectedTracks, track]);
  };

  const handleRemoveTrack = (track) => {
    setSelectedTracks((prevSelectedTracks) =>
      prevSelectedTracks.filter((t) => t._id !== track._id)
    );
  };

  const renderSelectedTracks = () => {
    return selectedTracks.map((track) => (
      <div key={track._id}>
        {track.title}
        <button onClick={() => handleRemoveTrack(track)}>Remove</button>
      </div>
    ));
  };

  return (
    <>
      <div>
        {listAlbum &&
          listAlbum.map((item) => (
            <div key={item._id}>
              {item.title} &nbsp; {item.tracks} &nbsp;
              <button>
                <NavLink to={`/albums/${item._id}`}>Detail</NavLink>
              </button>
            </div>
          ))}
        <button onClick={() => setShowModal(true)}>Create Album</button>
        <Modal
          show={showModal}
          heading="Create Album"
          onClose={() => setShowModal(false)}
        >
          <form onSubmit={handleCreateAlbum}>
            <label>Image</label>
            <br />
            <input type="file" name="image" onChange={handleFileChange} />
            <br />
            <label>Title</label>
            <br />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <br />
            <label>Genre</label>
            <br />
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
            />
            <br />
            <label>Release</label>
            <br />
            <input
              type="date"
              name="release"
              value={formData.release}
              onChange={handleInputChange}
            />
            <br />
            <label>
              <input
                type="radio"
                name="isPublic"
                value={true}
                checked={formData.isPublic === true}
                onChange={handleInputChange}
              />
              True
            </label>
            <label>
              <input
                type="radio"
                name="isPublic"
                value={false}
                checked={formData.isPublic === false}
                onChange={handleInputChange}
              />
              False
            </label>
            <br />
            <div>
              <label htmlFor="track">Search Tracks:</label>
              <br />
              <input
                type="text"
                id="track"
                name="track"
                value={searchTerm}
                onChange={handleTrackSearch}
              />
              <br />
              <div>
                <label>Selected Tracks:</label>
                {renderSelectedTracks()}
              </div>
              <br />
              <ul>
                {searchResults.map((track) => (
                  <li key={track._id}>
                    {track.title} &nbsp;
                    <button type="button" onClick={() => handleAddTrack(track)}>
                      Add
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button type="submit">Submit</button>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default ArtistAlbumPage;
