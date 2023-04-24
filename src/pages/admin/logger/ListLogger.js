import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLoggers } from "../../redux/apiRequest";
import { NavLink } from 'react-router-dom';

const ListLoggerPage = () => {
    const admin = useSelector((state) => state.auth.login?.currentUser);
    const [searchLevel, setSearchLevel] = useState('');
    const dispatch = useDispatch();
    const listLogger = useSelector((state) => state.logger.loggers?.allLoggers);
    useEffect(() => {
        getAllLoggers(admin?.data?.admin_token, dispatch);
    }, []);
    localStorage.setItem("token", admin?.data?.admin_token);
    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Search by level"
                    value={searchLevel}
                    onChange={(e) => setSearchLevel(e.target.value)}
                />

            </div>
            <div>
                {listLogger &&
                    listLogger.filter((item) => item.level.toLowerCase().includes(searchLevel.toLowerCase()))
                        .map((item) => (
                            <div key={item._id}>
                                <label>Level:</label> &nbsp;
                                {item.level}
                                <br></br>
                                <label>Username:</label> &nbsp;
                                {item.username}
                                <br></br>
                                <label>Time:</label> &nbsp;
                                {item.time}
                                <br></br>
                                <label>Log:</label> &nbsp;
                                {item.log}
                                <br></br>
                                ----------------------------------------
                            </div>
                        ))}
            </div>
        </>
    );
};

export default ListLoggerPage;