import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Modal from "components/modal/Modal";
import { getAllTrackArtists } from "redux/apiRequest";

const { default: axios } = require("api/axios");

const ArtistAlbumDetail = () => {
  const [album, setAlbum] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const artist = useSelector((state) => state.auth.login?.currentUser);
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
  const [updatedTracks, setUpdatedTracks] = useState([]);

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
    getAllTrackArtists(artist?.data?.artist_token, dispatch);
  }, [dispatch, artist]);

  useEffect(() => {
    axios
      .get(`/artist/album/${id}`, {
        headers: { Authorization: `Bearer ${artist?.data?.artist_token}` },
      })
      .then((response) => {
        const albumData = response.data;
        setAlbum(albumData);

        // Set the initial values of the form fields based on albumData
        setFormData({
          image: null,
          title: albumData.title,
          genre: albumData.genre,
          release: albumData.release,
          isPublic: albumData.isPublic,
          tracks: albumData.tracks || [],
        });

        // Set the initial selected tracks based on albumData
        setSelectedTracks(albumData.tracks || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, artist]);

  const handleUpdateAlbum = async (e) => {
    e.preventDefault();

    const albumData = new FormData();
    albumData.append("image", formData.image);
    albumData.append("title", formData.title);
    albumData.append("genre", formData.genre);
    albumData.append("release", formData.release);
    albumData.append("isPublic", formData.isPublic);
    albumData.append(
      "tracks",
      selectedTracks.map((track) => track._id)
    );

    try {
      const response = await axios.put(`/album/${id}`, albumData, {
        headers: {
          Authorization: `Bearer ${artist?.data?.artist_token}`,
        },
      });
      setSelectedTracks(selectedTracks);

      alert("Album updated successfully!");
      console.log(albumData);
    } catch (error) {
      console.log(error);
      alert("Failed to update album. Please try again.");
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
    <div>
      <label>Title</label>&nbsp;
      {album.title}
      <br />
      {album.tracks &&
        album.tracks.map((item) => {
          return (
            <div key={item._id}>
              Title track: {item.title}
              <br />
              <audio controls src={item.link}></audio>
            </div>
          );
        })}
      <br />
      <button onClick={() => setShowModal(true)}>Update album</button>
      <Modal
        show={showModal}
        heading="Update Album"
        onClose={() => setShowModal(false)}
      >
        <form onSubmit={handleUpdateAlbum}>
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
  );
};

export default ArtistAlbumDetail;
