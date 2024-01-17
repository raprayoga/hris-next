import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import toastReducer from "./toast";
import userReducer from "./user";

export default configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    user: userReducer,
  },
});
