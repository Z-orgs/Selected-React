import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "./adminSlice";
import artistReducer from "./artistSlice";
import trackReducer from "./trackSlice";
import playlistReducer from "./playlistSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        artist: artistReducer,
        track: trackReducer,
        playlist: playlistReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});