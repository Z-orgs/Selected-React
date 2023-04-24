import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllArtist } from "../../redux/apiRequest";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Modal from "../../components/modal/Modal";

const ListArtistPage = () => {
  const admin = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const listArtist = useSelector((state) => state.artist.artists?.allArtist);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLasttName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [nickName, setNichName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleCreateAdmin = async (e) => {
    const artist = {
      username,
      password,
      firstName,
      lastName,
      nickName,
      dob,
      email,
      phone,
    };
    try {
      await axios
        .post(`http://localhost:3000/artist`, artist, {
          headers: { Authorization: `Bearer ${admin?.data?.admin_token}` },
        })
        .then((res) => {
          console.log(res);
        });
      console.log(artist);
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    getAllArtist(admin?.data?.admin_token, dispatch);
  }, []);
  localStorage.setItem("token", admin?.data?.admin_token);
  const handleResetPassword = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/artist/reset/${id}`,
        { id },
        {
          headers: { Authorization: `Bearer ${admin?.data?.admin_token}` },
        }
      );
    } catch (e) {
      alert(e);
    }
  };
  return (
    <>
      {listArtist && listArtist.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Nick name</th>
              <th>Revenue</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listArtist.map((artist) => (
              <tr key={artist._id}>
                <td>{artist.username}</td>
                <td>{artist.nickName}</td>
                <td>{artist.revenue || "0"}</td>
                <td>
                  <button onClick={() => handleResetPassword(artist._id)}>
                    Reset password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nothing</p>
      )}
      <button onClick={() => setShowModal(true)}>Create artist</button>
      <Modal show={showModal} heading="Create Artist">
        <form onSubmit={handleCreateAdmin}>
          <label>Username</label>
          <br></br>
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label>Password</label>
          <br></br>
          <input
            type="text"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <label>First name</label>
          <br />
          <input
            type="text"
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />
          <label>Last name</label>
          <br />
          <input
            type="text"
            name="lastName"
            onChange={(e) => setLasttName(e.target.value)}
          />
          <br />
          <label>Nickname</label>
          <br />
          <input
            type="text"
            name="nickName"
            onChange={(e) => setNichName(e.target.value)}
          />
          <br />
          <label>Dob</label>
          <br />
          <input
            type="date"
            name="dob"
            onChange={(e) => setDob(e.target.value)}
          />
          <br />
          <label>Email</label>
          <br />
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Phone number</label>
          <br />
          <input
            type="text"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <button>Submit</button>
        </form>
      </Modal>
    </>
  );
};

export default ListArtistPage;
