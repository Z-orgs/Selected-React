import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllAdmins } from "../../redux/apiRequest";

const ListAdminPage = () => {
  const admin = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.admin.admins?.allAdmins);
  console.log(list);
  useEffect(() => {
    getAllAdmins(admin?.data?.admin_token, dispatch);
  }, []);
  localStorage.setItem("token", admin?.data?.admin_token);
  return (
    <div>
      {list &&
        list.map((ad) => (
          <div key={ad._id}>
            {ad.firstName} - {ad.lastName}
            <button>
              <NavLink to={`/admin/${ad._id}`}>View detail</NavLink>
            </button>
          </div>
        ))}
    </div>
  );
};

export default ListAdminPage;
