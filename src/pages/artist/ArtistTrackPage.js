import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Modal from "components/modal/Modal";
import { getAllTrackArtists } from "redux/apiRequest";
import { NavLink } from "react-router-dom";

const ArtistTrackPage = () => {
  const artist = useSelector((state) => state.auth.login?.currentUser);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const listTracks = useSelector(
    (state) => state.trackArtist.trackArtists?.allTrackArtists
  );
  const [formData, setFormData] = useState({
    file: null,
    title: "",
    genre: "",
    release: "",
    isPublic: true,
  });

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
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      file: file,
    }));
  };

  const handleUploadTrack = async (e) => {
    e.preventDefault();

    const trackData = new FormData();
    trackData.append("file", formData.file);
    trackData.append("title", formData.title);
    trackData.append("genre", formData.genre);
    trackData.append("release", formData.release);
    trackData.append("isPublic", formData.isPublic);

    try {
      await axios.post("/track", trackData, {
        headers: {
          Authorization: `Bearer ${artist?.data?.artist_token}`,
        },
      });
      alert("Track uploaded successfully!");
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    getAllTrackArtists(artist?.data?.artist_token, dispatch);
  }, []);
  return (
    <>
      <div>
        {listTracks &&
          listTracks.map((item) => (
            <div key={item._id}>
              {item.title} &nbsp;
              <button>
                <NavLink to={`/tracks/${item._id}`}>Detail</NavLink>
              </button>
            </div>
          ))}
      </div>
      <button onClick={() => setShowModal(true)}>Upload Track</button>
      <Modal
        show={showModal}
        heading="Upload Track"
        onClose={() => setShowModal(false)}
      >
        <form onSubmit={handleUploadTrack}>
          <label>File</label>
          <br />
          <input type="file" name="file" onChange={handleFileChange} />
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
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </>
  );
};

export default ArtistTrackPage;
