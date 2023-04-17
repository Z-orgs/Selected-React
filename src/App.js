import { Route, Routes } from "react-router-dom";
import axios from "axios";
import AdminHomePage from "./pages/admin/AdminHomePage";
import ListAdminPage from "./pages/admin/ListAdminPage";
import AdminByID from "./pages/admin/AdminById";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminChangePassword from "./pages/admin/AdminChangePassword";
import ListArtistPage from "./pages/artist/ListArtistPage";

axios.get("http://localhost:3000/mxz");

function App() {
  return (
    <Routes>
      <Route path="/login" exact element={<AdminLoginPage></AdminLoginPage>}></Route>
      <Route path="/admin" exact element={<AdminHomePage></AdminHomePage>}></Route>
      <Route path="/list-admin" exact element={<ListAdminPage></ListAdminPage>}></Route>
      <Route path="/admin/:slug" exact element={<AdminByID></AdminByID>}></Route>
      <Route path="/admin/:slug/reset-password" exact element={<AdminChangePassword></AdminChangePassword>}></Route>
      <Route path="/list-artist" exact element={<ListArtistPage></ListArtistPage>}></Route>
    </Routes>
  );
}

export default App;
