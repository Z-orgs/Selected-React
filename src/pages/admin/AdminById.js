import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { getAdminByID } from "../../redux/apiRequest";
import axios from "axios";

const AdminByID = () => {

    const [admin, setAdmin] = useState({});
    const { slug } = useParams();

    useEffect(() => {
        axios.get(`localhost:3000/admin/admin/${slug}`).then((response) => {
            setAdmin(response.data);
        });
    }, [slug]);
    return (
        <div>
            <h1>{admin.username}</h1>
            <p> {admin.firstName}</p>
            <p> {admin.lastName}</p>
        </div>
    );
};

export default AdminByID;
