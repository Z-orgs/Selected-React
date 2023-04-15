import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
const AdminHomePage = () => {
  return (
    <div>
      <h1>Admin home page</h1>
      <button>
        <NavLink to={'/list-admin'}>List admin</NavLink>
      </button>
    </div>
  );
};

export default AdminHomePage;
