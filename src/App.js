import React from "react";
import "./App.css";
<<<<<<< Updated upstream
import Login from "./pages/login";

function App() {
  return (
    <Login />
=======
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import AdminHomePage from "./pages/admin/AdminHomePage";
import ListAdminPage from "./pages/admin/ListAdminPage";
import AdminByID from "./pages/admin/AdminById";
const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage"));


// const AdminHomePage = lazy(() => import("./pages/admin/ListAdminPage"));
axios.get("http://localhost:3000/mxz");
function App() {
  return (
    <Routes>
      <Route path="/login" exact element={<AdminLoginPage></AdminLoginPage>}></Route>
      <Route path="/admin" exact element={<AdminHomePage></AdminHomePage>}></Route>
      <Route path="/list-admin" exact element={<ListAdminPage></ListAdminPage>}></Route>
      <Route path="/admin/:slug" exact element={<AdminByID></AdminByID>}></Route>
    </Routes>
>>>>>>> Stashed changes
  );
}

export default App;
