import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "./admin/adminSlice";
import artistReducer from "./admin/artistSlice";
import trackReducer from "./admin/trackSlice";
import playlistReducer from "./admin/playlistSlice";
import albumReducer from "./admin/albumSlice";
import userReducer from "./admin/userSlice";
import loggerReducer from "./admin/loggerSlice";
import homePageReducer from "./user/homePageSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  artist: artistReducer,
  track: trackReducer,
  playlist: playlistReducer,
  album: albumReducer,
  user: userReducer,
  logger: loggerReducer,
  homePage: homePageReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
