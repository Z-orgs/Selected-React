import axios from "axios";
import { loginStart, loginSuccess, loginFail, loginWithGG } from "./authSlice";
import {
  getAdminsFailed,
  getAdminsStart,
  getAdminsSuccess,
} from "./admin/adminSlice";
import {
  getArtistStart,
  getArtistSuccess,
  getArtistFailed,
} from "./admin/artistSlice";
import {
  getTrackStart,
  getTrackSuccess,
  getTrackFailed,
} from "./admin/trackSlice";
import {
  getPlaylistStart,
  getPlaylistSuccess,
  getPlaylistFailed,
} from "./admin/playlistSlice";
import {
  getAlbumsStart,
  getAlbumsSuccess,
  getAlbumsFailed,
} from "./admin/albumSlice";
import {
  getUsersStart,
  getUsersSuccess,
  getUsersFailed,
} from "./admin/userSlice";
import {
  getLoggersStart,
  getLoggersSuccess,
  getLoggersFailed,
} from "./admin/loggerSlice";
import {
  getHomePageFailed,
  getHomePageStart,
  getHomePageSuccess,
} from "./user/homePageSlice";

// const dispatch = useDispatch();
// const navigate = useNavigate();

export const loginUser = async (role = "admin", user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      `${
        role === "Admin"
          ? "http://localhost:3000/auth/admin/login"
          : role === "Artist"
          ? "http://localhost:3000/auth/artist/login"
          : ""
      }`,
      user
    );
    dispatch(loginSuccess({ res, role }));
    console.log({ res, role });
    navigate("/");
  } catch (err) {
    dispatch(loginFail());
  }
};

export const loginUserWithGoogle = async (credential, dispatch, navigate) => {
  try {
    const res = await axios.post("http://localhost:3000/auth/login", {
      token: credential,
    });
    dispatch(loginWithGG(res));
    navigate("/");
  } catch (err) {
    console.log(err);
  }
  // return data;
};

export const getAllAdmins = async (accessToken, dispatch) => {
  dispatch(getAdminsStart());
  try {
    const res = await axios.get("http://localhost:3000/admin/admin", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res.data);
    dispatch(getAdminsSuccess(res.data));
  } catch (err) {
    dispatch(getAdminsFailed());
  }
};

export const getAllArtist = async (accessToken, dispatch) => {
  dispatch(getArtistStart());
  try {
    const res = await axios.get("http://localhost:3000/admin/artist", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res.data);
    dispatch(getArtistSuccess(res.data));
  } catch (err) {
    dispatch(getArtistFailed());
  }
};

export const getAllTracks = async (accessToken, dispatch) => {
  dispatch(getTrackStart());
  try {
    const res = await axios.get("http://localhost:3000/admin/track", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res.data);
    dispatch(getTrackSuccess(res.data));
  } catch (err) {
    dispatch(getTrackFailed());
  }
};
export const getAllPlaylists = async (accessToken, dispatch) => {
  dispatch(getPlaylistStart());
  try {
    const res = await axios.get("http://localhost:3000/admin/playlist", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res.data);
    dispatch(getPlaylistSuccess(res.data));
  } catch (err) {
    dispatch(getPlaylistFailed());
  }
};

export const getAllAlbums = async (accessToken, dispatch) => {
  dispatch(getAlbumsStart());
  try {
    const res = await axios.get("http://localhost:3000/admin/album", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res.data);
    dispatch(getAlbumsSuccess(res.data));
  } catch (err) {
    dispatch(getAlbumsFailed());
  }
};

export const getAllUsers = async (accessToken, dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get("http://localhost:3000/admin/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res.data);
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailed());
  }
};

export const getAllLoggers = async (accessToken, dispatch) => {
  dispatch(getLoggersStart());
  try {
    const res = await axios.get("http://localhost:3000/admin/logger", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res.data);
    dispatch(getLoggersSuccess(res.data));
  } catch (err) {
    dispatch(getLoggersFailed());
  }
};

export const getHomePage = async (accessToken, dispatch) => {
  try {
    dispatch(getHomePageStart());

    const res = await axios.get("http://localhost:3000/home", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res);
    dispatch(getHomePageSuccess(res.data));
  } catch (err) {
    dispatch(getHomePageFailed());
  }
};

export const createPlaylistUser = async (namePlaylist, token) => {
  await axios
    .post(
      "http://localhost:3000/playlist",
      {
        title: namePlaylist,
        tracks: JSON.stringify([]),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const followArtistToggle = async (idArtist, token, followed = false) => {
  if (!followed) {
    await axios
      .put(`http://localhost:3000/user/follow/${idArtist}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  } else {
    await axios
      .put(`http://localhost:3000/user/unfollow/${idArtist}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }
};
