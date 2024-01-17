import { createSlice } from "@reduxjs/toolkit";
import { ToastSliceState } from "@/interface/toast";

const initialState: ToastSliceState = {
  isShow: false,
  type: "white",
  message: "",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast(state, action) {
      state.isShow = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    hideToast(state) {
      state.isShow = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
