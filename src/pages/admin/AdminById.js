import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { getAdminByID } from "../../redux/apiRequest";
import axios from "axios";

const AdminByID = () => {
  const [admin, setAdmin] = useState({});
  const { slug } = useParams();
  const list = useSelector((state) => state.admin.admins?.allAdmins);
  //   const ad = list.map((item) => item._id === slug);
  const ad = useSelector((state) => state.auth.login?.currentUser);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/admin/${slug}`, {
        // headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        headers: { Authorization: `Bearer ${ad?.data?.admin_token}` },
      })
      .then((response) => {
        setAdmin(response.data);
      });
    console.log("hello");
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
