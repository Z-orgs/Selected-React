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