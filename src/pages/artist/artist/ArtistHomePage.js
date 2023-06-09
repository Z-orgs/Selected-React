import { NavLink } from "react-router-dom";
import Modal from "./../../../components/modal/Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ArtistHomePage = () => {
  const ar = useSelector((state) => state.auth.login?.currentUser);
  const [artistData, setArtistData] = useState({
    nickName: "",
    firstName: "",
    lastName: "",

    address: "",
    genre: "",
    socialLinks: [{ name: "", url: "" }],
    dob: "",
    email: "",
    phone: "",
    image: null,
  });
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (ar) {
      // Extract artist data from Redux store and update artistData state
      const {
        address,
        genre,
        socialLinks,
        dob,
        email,
        phone,
        nickName,
        firstName,
        lastName,
        image,
      } = ar.data;
      setArtistData((prevData) => ({
        ...prevData,
        address,
        genre,
        socialLinks,
        dob,
        email,
        phone,
        nickName,
        firstName,
        lastName,
        image,
      }));
    }
  }, [ar]);

  const handleUpdateArtist = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("address", artistData.address);
    formData.append("genre", artistData.genre);
    formData.append("dob", artistData.dob);
    formData.append("email", artistData.email);
    formData.append("phone", artistData.phone);
    formData.append("nickName", artistData.nickName);
    formData.append("firstName", artistData.firstName);
    formData.append("lastName", artistData.lastName);
    if (artistData.image) {
      formData.append("image", artistData.image);
    }

    formData.append("socialLinks", JSON.stringify(artistData.socialLinks));

    console.log(artistData);
    try {
      const response = await axios.put(
        "http://localhost:3000/artist",
        formData,
        {
          headers: {
            Authorization: `Bearer ${ar?.data?.artist_token}`,
            "Content-Type": artistData.image
              ? "multipart/form-data"
              : "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(response);
      // Update the artist data in the Redux store or perform any other necessary actions
      // ...

      setShowModal(false);
    } catch (e) {
      alert(e);
    }
  };

  const handleInputChange = (field, value) => {
    setArtistData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAddSocialLink = () => {
    setArtistData((prevData) => ({
      ...prevData,
      socialLinks: [...prevData.socialLinks, { name: "", url: "" }],
    }));
  };

  const handleSocialLinkChange = (index, field, value) => {
    setArtistData((prevData) => {
      const updatedSocialLinks = [...prevData.socialLinks];
      updatedSocialLinks[index][field] = value;
      return {
        ...prevData,
        socialLinks: updatedSocialLinks,
      };
    });
  };
  console.log(artistData);

  return (
    <>
      <div>Artist Home Page</div>
      <div>
        <button>
          <NavLink to={"/artist/change-password"}>Change password</NavLink>
        </button>
        <br />
        <button onClick={() => setShowModal(true)}>Update</button>

        <Modal
          show={showModal}
          heading="Update"
          onClose={() => setShowModal(false)}
        >
          <form onSubmit={handleUpdateArtist}>
            <label>Image</label>
            <br />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => handleInputChange("image", e.target.files[0])}
            />
            <br />
            <label>Nickname</label>
            <br />
            <input
              type="text"
              name="nickName"
              value={artistData.nickName}
              onChange={(e) => handleInputChange("nickName", e.target.value)}
            />
            <br />
            <label>First Name</label>
            <br />
            <input
              type="text"
              name="firstName"
              value={artistData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
            <br />
            <label>Last Name</label>
            <br />
            <input
              type="text"
              name="lastName"
              value={artistData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
            <br />
            <label>Address</label>
            <br />
            <input
              type="text"
              name="address"
              value={artistData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
            <br />
            <label>Genre</label>
            <br />
            <input
              type="text"
              name="genre"
              value={artistData.genre}
              onChange={(e) => handleInputChange("genre", e.target.value)}
            />
            {artistData.socialLinks.map((link, index) => (
              <div key={`socialLink-${index}`}>
                <br />
                <label>Social Link Name</label>
                <br />
                <input
                  type="text"
                  name={`socialName-${index}`}
                  value={link.name}
                  onChange={(e) =>
                    handleSocialLinkChange(index, "name", e.target.value)
                  }
                />
                <br />
                <label>Social Link URL</label>
                <br />
                <input
                  type="text"
                  name={`socialURL-${index}`}
                  value={link.url}
                  onChange={(e) =>
                    handleSocialLinkChange(index, "url", e.target.value)
                  }
                />
              </div>
            ))}
            <br />
            <button type="button" onClick={handleAddSocialLink}>
              Add Social Link
            </button>
            <br />
            <label>Dob</label>
            <br />
            <input
              type="date"
              name="dob"
              value={artistData.dob}
              onChange={(e) => handleInputChange("dob", e.target.value)}
            />
            <br />
            <label>Email</label>
            <br />
            <input
              type="text"
              name="email"
              value={artistData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <br />
            <label>Phone number</label>
            <br />
            <input
              type="text"
              name="phone"
              value={artistData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </Modal>
        <br />
        <button>
          <NavLink to={"/artist/track"}>Track</NavLink>
        </button>
        <br />
        <button>
          <NavLink to={"/artist/album"}>Album</NavLink>
        </button>
      </div>
    </>
  );
};

export default ArtistHomePage;
