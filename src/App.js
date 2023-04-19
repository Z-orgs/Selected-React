import { Route, Routes } from "react-router-dom";
import axios from "axios";
import AdminHomePage from "./pages/admin/AdminHomePage";
import ListAdminPage from "./pages/admin/ListAdminPage";
import AdminByID from "./pages/admin/AdminById";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import ListArtistPage from "./pages/artist/ListArtistPage";
import ListTrackPage from "./pages/tracks/ListTrackPage";
import TrackDetail from "./pages/tracks/TrackDetail";

axios.get("http://localhost:3000/Kwzng");

function App() {
  return (
    <Routes>
      <Route path="/login" exact element={<AdminLoginPage></AdminLoginPage>}></Route>
      <Route path="/admin" exact element={<AdminHomePage></AdminHomePage>}></Route>
      <Route path="/list-admin" exact element={<ListAdminPage></ListAdminPage>}></Route>
      <Route path="/admin/:slug" exact element={<AdminByID></AdminByID>}></Route>
      <Route path="/list-artist" exact element={<ListArtistPage></ListArtistPage>}></Route>
      <Route path="/list-track" exact element={<ListTrackPage></ListTrackPage>}></Route>
      <Route path="/track/:slug" exact element={<TrackDetail></TrackDetail>}></Route>
    </Routes>
  );
}

export default App;
