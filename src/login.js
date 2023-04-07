import React, { useState } from "react";
import axios from "axios";

function Login() {
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

export default Login;
