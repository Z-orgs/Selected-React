import axios from "axios";
import { loginStart, loginSuccess, loginFail } from "./authSlice";
import {
  getAdminsFailed,
  getAdminsStart,
  getAdminsSuccess,
} from "./adminSlice";

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

export const getAdminByID = async (accessToken, dispatch) => {
  dispatch(getAdminsStart());
  try {
    const res = await axios.get(
      `localhost:3000/admin/admin/6421da9cb507ca367d98d04c`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    console.log(res.data);
    // dispatch(getAdminsSuccess(res.data));
  } catch (err) {
    dispatch(getAdminsFailed());
  }
};
