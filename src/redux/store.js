import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "./adminSlice";
import artistReducer from "./artistSlice";
import trackReducer from "./trackSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        artist: artistReducer,
        track: trackReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});