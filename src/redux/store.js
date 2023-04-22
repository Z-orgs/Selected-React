import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "./adminSlice";
import artistReducer from "./artistSlice";
import trackReducer from "./trackSlice";
import playlistReducer from "./playlistSlice";
import albumReducer from "./albumSlice";
import userReducer from "./userSlice";
import loggerReducer from './loggerSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        artist: artistReducer,
        track: trackReducer,
        playlist: playlistReducer,
        album: albumReducer,
        user: userReducer,
        logger: loggerReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});