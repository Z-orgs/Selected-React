import axios from "axios";
import { loginStart, loginSuccess, loginFail } from "./authSlice";
import { getAdminsFailed, getAdminsStart, getAdminsSuccess, } from "./adminSlice";
import { getArtistStart, getArtistSuccess, getArtistFailed, } from "./artistSlice";
import { getTrackStart, getTrackSuccess, getTrackFailed, } from "./trackSlice";
import { getPlaylistStart, getPlaylistSuccess, getPlaylistFailed } from "./playlistSlice";
import { getAlbumsStart, getAlbumsSuccess, getAlbumsFailed } from "./albumSlice";

// const dispatch = useDispatch();
// const navigate = useNavigate();

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "http://localhost:3000/auth/admin/login",
      user
    );
    dispatch(loginSuccess(res));
    navigate("/admin");
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
  dispatch(getPlaylistStart());
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
  dispatch(getTrackStart());
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
}

