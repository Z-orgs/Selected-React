import { NavLink } from "react-router-dom";
import Modal from './../../../components/modal/Modal';
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const ArtistHomePage = () => {
    const ar = useSelector((state) => state.auth.login?.currentUser);
    const [address, setAddress] = useState("");
    const [genre, setGenre] = useState("");
    const [socialLinks, setSocialLinks] = useState("");
    const [name, setSocialName] = useState('');
    const [url, setSocialURL] = useState('');
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [showModal, setShowModal] = useState(false);
    const handleUpdateArtist = async (e) => {
        const artist = {
            address,
            genre,
            socialLinks,
            dob,
            email,
            phone,
        };
        try {
            await axios
                .put(`http://localhost:3000/artist`, artist, {
                    headers: {
                        Authorization: `Bearer ${ar?.data?.artist_token}`,
                    },
                })
                .then((res) => {
                    setSocialLinks(res.socialLinks);
                });
            console.log(artist);
        } catch (e) {
            alert(e);
        }
    };
    return (
        <>
            <div>
                Artist Home Page
            </div>
            <div>
                <button>
                    <NavLink to={'/artist/change-password'}>Change password</NavLink>
                </button>
                <br></br>
                <button onClick={() => setShowModal(true)}>Update</button>

                <Modal
                    show={showModal}
                    heading="Update"
                    onClose={() => setShowModal(false)}
                >
                    <form onSubmit={handleUpdateArtist}>
                        <label>Address</label>
                        <br></br>
                        <input
                            type="text"
                            name="address"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <br />
                        <label>Genre</label>
                        <br></br>
                        <input
                            type="text"
                            name="genre"
                            onChange={(e) => setGenre(e.target.value)}
                        />
                        <div>
                            <br />
                            <label>Social Link</label>
                            <br />
                            <input
                                type="text"
                                name="socialLinks"
                                onChange={(e) => setSocialLinks(e.target.value)}
                            />
                        </div>
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
                <br></br>
                <button>
                    <NavLink to={'/artist/track'}>Track</NavLink>
                </button>
                <br></br>
                <button>
                    <NavLink to={'/artist/album'}>Album</NavLink>
                </button>
            </div>
        </>
    );
};
export default ArtistHomePage;