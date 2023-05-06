import { Route, Routes } from "react-router-dom";
import axios from "axios";
import AdminHomePage from "./pages/admin/admin/AdminHomePage";
import ListAdminPage from "./pages/admin/admin/ListAdminPage";
// import AdminByID from './pages/admin/admin/AdminById';
// import AdminLoginPage from "./pages/admin/admin/AdminLoginPage";
import ListArtistPage from "./pages/admin/artist/ListArtistPage";
import ListTrackPage from "./pages/admin/tracks/ListTrackPage";
import TrackDetail from "./pages/admin/tracks/TrackDetail";
// import CreateAdmin from './pages/admin/admin/CreateAdmin';
import AdminChangePassword from "./pages/admin/admin/AdminChangePassword";
import CreateArtist from "./pages/admin/artist/CreateArtist";
import ListPLaylistPage from "./pages/admin/playlist/ListPlayListPage";
import PlaylistDetail from "./pages/admin/playlist/PlaylistDetail";
import ListAlbumPage from "./pages/admin/album/ListAlbum";
import AlbumDetail from "./pages/admin/album/AlbumDetail";
import ListUserPage from "./pages/admin/user/ListUser";
import ListLoggerPage from "./pages/admin/logger/ListLogger";
import LoginPage from "./pages/LoginPage";
import AdminDashBoardPage from "./pages/admin/AdminDashBoardPage";
import LayoutDashboard from "./layout/LayoutDashboard";
import { useDispatch, useSelector } from "react-redux";

axios.get("http://localhost:3000/Kwzng");

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.login.role);
  const isLogin = useSelector((state) => state.auth.login.isAuthenticated);
  return (
    <>
      <Routes>
        {!isLogin && (
          <Route path="/" exact element={<LoginPage></LoginPage>}></Route>
        )}
        <Route
          element={
            isLogin &&
            (role === "Admin" || "Artist") && (
              <LayoutDashboard></LayoutDashboard>
            )
          }
        >
          {role === "Admin" && (
            <>
              <Route
                path="/"
                element={<AdminDashBoardPage></AdminDashBoardPage>}
              ></Route>
              <Route
                path="/admin"
                exact
                element={<AdminHomePage></AdminHomePage>}
              ></Route>
              <Route
                path="/admins"
                exact
                element={<ListAdminPage></ListAdminPage>}
              ></Route>
              <Route
                path="/artists"
                exact
                element={<ListArtistPage></ListArtistPage>}
              ></Route>
              <Route
                path="/tracks"
                exact
                element={<ListTrackPage></ListTrackPage>}
              ></Route>
              <Route
                path="/track/:slug"
                exact
                element={<TrackDetail></TrackDetail>}
              ></Route>
              <Route
                path="/admin/change-password"
                exact
                element={<AdminChangePassword></AdminChangePassword>}
              ></Route>
              <Route
                path="/admin/create-artist"
                exact
                element={<CreateArtist></CreateArtist>}
              ></Route>
              <Route
                path="/playlists"
                exact
                element={<ListPLaylistPage></ListPLaylistPage>}
              ></Route>
              <Route
                path="/playlists/:slug"
                exact
                element={<PlaylistDetail></PlaylistDetail>}
              ></Route>
              <Route
                path="/albums"
                exact
                element={<ListAlbumPage></ListAlbumPage>}
              ></Route>
              <Route
                path="/album/:slug"
                exact
                element={<AlbumDetail></AlbumDetail>}
              ></Route>
              <Route
                path="/users"
                exact
                element={<ListUserPage></ListUserPage>}
              ></Route>
              <Route
                path="/logger"
                exact
                element={<ListLoggerPage></ListLoggerPage>}
              ></Route>
            </>
          )}
        </Route>
      </Routes>
      {/* <div className="mx-auto my-8">
        <LoginPage></LoginPage>
      </div> */}
      {/* <LoginPage></LoginPage> */}
    </>
  );
}

export default App;
