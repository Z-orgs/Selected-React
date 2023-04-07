<<<<<<< Updated upstream
import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');


    // useEffect(() => {
    //     async function fetchData() {
    //         // You can await here
    //         const res = await axios.post(
    //             "http://localhost:3000/auth/admin/login",

    //         );
    //         // ...
    //     }
    //     fetchData();
    // }, []); // Or [] if effect doesn't need props or state

    const handleOnClick = () => {
        axios.post(
            "http://localhost:3000/auth/admin/login",
            {
                username,
                password,
            }
        );
    };
    return (
        <>
            <div>
                <label>Username</label><br />
                <input type="text" value={username} onChange={(event) => setUserName(event.target.value)} />
            </div>
            <div>
                <label>Password</label><br />
                <input type="text" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <div>
                <button type="button" onClick={() => handleOnClick()}>Submit</button>
            </div>
        </>
    );
};

export default Login;
=======
import React, { useState } from "react";
import axios from "axios";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    axios.get("http://localhost:3000/mxz");
    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/auth/admin/login",
                {
                    username,
                    password,
                }
            );
            console.log(response);
            const token = response.data.admin_token;
            localStorage.setItem("token", token);
            setLoggedIn(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
    };

    return (
        <div>
            {loggedIn ? (
                <div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
        </div>
    );
}

export default App;
>>>>>>> Stashed changes
