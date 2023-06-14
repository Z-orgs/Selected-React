import { Route, Routes } from "react-router-dom";
import AdminHomePage from "pages/admin/admin/AdminHomePage";
import ListAdminPage from "pages/admin/admin/ListAdminPage";
import ListArtistPage from "pages/admin/artist/ListArtistPage";
import ListTrackPage from "pages/admin/tracks/ListTrackPage";
import TrackDetail from "pages/admin/tracks/TrackDetail";
import ListPLaylistPage from "pages/admin/playlist/ListPlayListPage";
import PlaylistDetail from "pages/admin/playlist/PlaylistDetail";
import ListAlbumPage from "pages/admin/album/ListAlbum";
import AlbumDetail from "pages/admin/album/AlbumDetail";
import ListUserPage from "pages/admin/user/ListUser";
import ListLoggerPage from "pages/admin/logger/ListLogger";
import LoginPage from "pages/LoginPage";
import AdminDashBoardPage from "pages/admin/AdminDashBoardPage";
import LayoutDashboard from "layout/LayoutDashboard";
import { useSelector } from "react-redux";
import ArtistTrackPage from "pages/artist/track/ArtistTrackPage";
import LayoutSeleted from "layout/LayoutSeleted";
import HomePage from "pages/user/HomePage";
import AlbumDetailPage from "pages/user/AlbumDetailPage";
import PlaylistPage from "pages/user/PlaylistPage";
import ArtistDetailPage from "pages/user/ArtistDetailPage";
import SongsFavoritePage from "pages/user/SongsFavoritePage";
import SearchResultPage from "pages/user/SearchResultPage";
import PlaylistDetailPage from "pages/user/PlaylistDetailPage";
import ArtistHomePage from "pages/artist/artist/ArtistHomePage";
import ArtistTrackDetail from "pages/artist/track/ArtistTrackDetail";
import ArtistAlbumPage from "pages/artist/album/ArtistAlbumPage";
import ArtistAlbumDetail from "pages/artist/album/ArtistAlbumDetail";
import SubscribePage from "pages/user/SubscribePage";
import SearchTracksResult from "pages/user/SearchTracksResult";
import SearchArtistsResult from "pages/user/SearchArtistsResult";
import SearchAlbumsResult from "pages/user/SearchAlbumsResult";
const { default: axios } = require("api/axios");

axios.get("/");

function App() {
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
                path="/albums/:slug"
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
          {role === "Artist" && (
            <>
              <Route
                path="/"
                exact
                element={<ArtistHomePage></ArtistHomePage>}
              ></Route>
              <Route
                path="/tracks"
                exact
                element={<ArtistTrackPage></ArtistTrackPage>}
              ></Route>
              <Route
                path="/tracks/:slug"
                exact
                element={<ArtistTrackDetail></ArtistTrackDetail>}
              ></Route>
              <Route
                path="/albums"
                exact
                element={<ArtistAlbumPage></ArtistAlbumPage>}
              ></Route>
              <Route
                path="/albums/:id"
                exact
                element={<ArtistAlbumDetail></ArtistAlbumDetail>}
              ></Route>
            </>
          )}
        </Route>
        {/* <Route exact path="/" element={<LayoutSeleted></LayoutSeleted>}></Route> */}
        <Route
          element={
            isLogin && role === "User" && <LayoutSeleted></LayoutSeleted>
          }
        >
          <Route path="/" exact element={<HomePage></HomePage>}></Route>
          <Route
            path="/albums/:id"
            extract
            element={<AlbumDetailPage></AlbumDetailPage>}
          ></Route>
          <Route
            path="/artists/:id"
            extract
            element={<ArtistDetailPage></ArtistDetailPage>}
          ></Route>
          <Route
            path="/playlists"
            exact
            element={<PlaylistPage></PlaylistPage>}
          ></Route>
          <Route
            path="/playlists/:id"
            extract
            element={<PlaylistDetailPage></PlaylistDetailPage>}
          ></Route>
          <Route
            path="/songs-favorite"
            exact
            element={<SongsFavoritePage></SongsFavoritePage>}
          ></Route>
          <Route
            path="/search/:keyword"
            extract
            element={<SearchResultPage></SearchResultPage>}
          ></Route>
          <Route
            path="/search/:keyword"
            extract
            element={<SearchResultPage></SearchResultPage>}
          ></Route>
          <Route
            path="/search_tracks/:keyword"
            extract
            element={<SearchTracksResult></SearchTracksResult>}
          ></Route>
          <Route
            path="/search_artists/:keyword"
            extract
            element={<SearchArtistsResult></SearchArtistsResult>}
          ></Route>
          <Route
            path="/search_albums/:keyword"
            extract
            element={<SearchAlbumsResult></SearchAlbumsResult>}
          ></Route>
          <Route
            path="/subscribe"
            extract
            element={<SubscribePage></SubscribePage>}
          ></Route>
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
