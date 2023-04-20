import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const CreateAdmin = () => {
    const ad = useSelector((state) => state.auth.login?.currentUser);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLasttName] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const handleCreateAdmin = async (e) => {
        const admin = {
            username,
            password,
            firstName,
            lastName
        };
        try {
            await axios.post(`http://localhost:3000/admin/`, admin, {
                headers: { Authorization: `Bearer ${ad?.data?.admin_token}` },
            }).then((res) => {
                console.log(res);
            });
            console.log(admin);
        } catch (e) {
            alert(e);
        }
    };

    return (
        <div>
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
                <button >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateAdmin;