import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
        headers: { Authorization: `Bearer ${ad?.data?.admin_token}` },
      })
      .then((response) => {
        setAdmin(response.data);
      });
    console.log(admin);
  }, [slug]);
  const handleResetPassword = async () => {
    const res = await axios.put(`http://localhost:3000/admin/${slug}`, {
      headers: { Authorization: `Bearer ${ad?.data?.admin_token}` },
    });
    console.log(res);
  };
  return (
    <div>
      <h1>{admin.username}</h1>
      <p> {admin.firstName}</p>
      <p> {admin.lastName}</p>
      <p> {admin.password}</p>
      <button onClick={() => handleResetPassword()} >
        Reset password
      </button>
    </div>
  );
};

export default AdminByID;
