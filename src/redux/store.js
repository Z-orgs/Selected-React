import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "./adminSlice";
import artistReducer from "./artistSlice";
import trackReducer from "./trackSlice";
import playlistReducer from "./playlistSlice";
import albumSlice from "./albumSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        artist: artistReducer,
        track: trackReducer,
        playlist: playlistReducer,
        album: albumSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});