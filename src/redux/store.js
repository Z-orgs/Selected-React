import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "./adminSlice";
import artistReducer from "./artistSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        artist: artistReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});