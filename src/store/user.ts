import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editProfile, profile } from "@/services/userService";
import {
  ProfileResponse,
  ProfileSliceState,
  UserEditInputForm,
} from "@/interface/user";
import Router from "next/router";

const initialState: ProfileSliceState = {
  successFetch: false,
  loading: false,
  data: null,
  error: null,
};

export const profileAsync = createAsyncThunk<ProfileResponse>(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    return await profile()
      .then((response) => response)
      .catch((error) => {
        if (error.response.status === 401) Router.push("/login");
        return rejectWithValue(error.response.data);
      });
  }
);

export const editProfileAsync = createAsyncThunk<
  ProfileResponse,
  UserEditInputForm
>("user/fetchEditUser", async (payload, { rejectWithValue }) => {
  return await editProfile(payload)
    .then((response) => response)
    .catch((error) => {
      if (error.response.status === 401) Router.push("/login");
      return rejectWithValue(error.response.data);
    });
});

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset(state) {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
    resetUserFetch(state) {
      state.loading = state.successFetch = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profileAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(profileAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(profileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ProfileResponse;
      })

      .addCase(editProfileAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.successFetch = true;
        state.data = action.payload;
      })
      .addCase(editProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ProfileResponse;
      })
  },
});

// Action creators are generated for each case reducer function
export const { reset, resetUserFetch } = profileSlice.actions;

export default profileSlice.reducer;
