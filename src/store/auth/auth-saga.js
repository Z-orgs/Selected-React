import { takeLatest } from "redux-saga";
import { authLogin } from "./auth-slice";
import handleAuthLogin from "./auth-handlers";

export default function* authSaga() {
    yield takeLatest(authLogin.type, handleAuthLogin());
}