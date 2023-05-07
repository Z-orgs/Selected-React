import axios from "axios";
import { loginStart, loginSuccess, loginFail } from "./authSlice";
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

// const dispatch = useDispatch();
// const navigate = useNavigate();

export const loginUser = async (role = "admin", user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      `${role === "Admin"
        ? "http://localhost:3000/auth/admin/login"
        : "http://localhost:3000/auth/artist/login"
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
