import axios from "axios";
import Fetch from "../config/fetch";
import { useEffect, useState } from "react";
const Login = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    axios.get("http://localhost:3000/mxz");
    const handleLogin = () => {
        try {
            const response = Fetch('http://localhost:3000/auth/admin/login', {
                username,
                password,
            });
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
                    <button onClick={() => handleLogin()}>Login</button>
                </div>
            )}
        </div>
    );

};

export default Login;