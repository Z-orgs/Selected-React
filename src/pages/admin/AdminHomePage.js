import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const AdminHomePage = () => {
  return (
    <div>
      <h1>Admin home page</h1>
      <button>
        <NavLink to={'/list-admin'}>List admin</NavLink>
      </button>
      <br></br>
      <button>
        <NavLink to={'/list-artist'}>List artist</NavLink>
      </button>
    </div>
  );
};

export default AdminHomePage;
