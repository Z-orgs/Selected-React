import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Modal from "../../components/modal/Modal";
import { Button } from "../../components/button";

const ArtistTrackPage = () => {
  const artist = useSelector((state) => state.auth.login?.currentUser);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    file: null,
    title: "",
    genre: "",
    release: "",
    isPublic: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
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
      await axios.post("http://localhost:3000/track", trackData, {
        headers: {
          Authorization: `Bearer ${artist?.data?.artist_token}`,
        },
      });
      alert("Track uploaded successfully!");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Upload Track</Button>
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
          <Button type="submit">Submit</Button>
        </form>
      </Modal>
    </>
  );
};

export default ArtistTrackPage;
