import { loginUser } from "@/services/authService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "@/services/baseService";
import {
  AuthSliceState,
  LoginInputsForm,
  LoginResponse,
} from "@/interface/auth";
import Router from "next/router";

const initialState: AuthSliceState = {
  isLogin: false,
  loading: false,
  error: null,
};

export const loginAsync = createAsyncThunk<LoginResponse, LoginInputsForm>(
  "auth/fetchLogin",
  async (payload, { rejectWithValue }) => {
    return await loginUser(payload)
      .then((response) => response)
      .catch((error) => {
        if (error.response.status === 401) Router.push("/login");
        return rejectWithValue(error.response.data);
      });
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLogin = false;
      delete http.defaults.headers.common.Authorization;
      localStorage.removeItem('token')
      Router.push("/login")
    },
    setToken(state, action) {
      state.isLogin = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLogin = true;
        state.loading = false;
        localStorage.setItem('token', JSON.stringify("Bearer " + action.payload?.token))
        http.defaults.headers.common.Authorization =
          "Bearer " + action.payload?.token;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = state.isLogin = false;
        state.error = action.payload as LoginResponse;
      });
  },
});

// Action creators are generated for each case reducer function
export const { logout, setToken } = authSlice.actions;

export default authSlice.reducer;
