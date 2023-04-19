import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";

const AdminResetPassword = () => {
    const [admin, setAdmin] = useState({});
    const { slug } = useParams();
    const list = useSelector((state) => state.admin.admins?.allAdmins);
    //   const ad = list.map((item) => item._id === slug);
    const ad = useSelector((state) => state.auth.login?.currentUser);
    const handleChangePassword = () => {

    };
    useEffect(() => {
        axios
            .get(`http://localhost:3000/admin/admin/${slug}`, {
                // headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                headers: { Authorization: `Bearer ${ad?.data?.admin_token}` },
            })
            .then((response) => {
                setAdmin(response.data);
            });
        console.log(admin);
    }, [slug]);
    return (
        <div>
            <button>
                <NavLink to={`/admin/${admin._id}/reset-password`}>Reset password</NavLink>
            </button>
        </div>
    );
};

export default AdminResetPassword;