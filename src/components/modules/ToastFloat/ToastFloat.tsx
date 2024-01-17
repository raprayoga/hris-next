import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "@/store/toast";
import { sliceState } from "@/interface/state";
import { Dispatch } from "@reduxjs/toolkit";
import Toast from "@/components/elements/Toast";
import { getItemFromLocalStorage } from "@/utils/store";
import { setToken } from "@/store/auth";
import http from "@/services/baseService";

export default function ToastFloat() {
  const dispatch: Dispatch<any> = useDispatch();
  const toast = useSelector((state: sliceState) => state.toast);

  useEffect(() => {
    const token = getItemFromLocalStorage('token')
    if (token) {
      http.defaults.headers.common.Authorization = token
      dispatch(setToken(token));
    }
  }, [])


  useEffect(() => {
    if (toast.isShow) {
      setTimeout(() => {
        dispatch(hideToast());
      }, 5000);
    }
  }, [dispatch, toast.isShow]);

  return (
    <Toast
      onCLosed={() => dispatch(hideToast())}
      isShow={toast.isShow}
      theme={toast.type}
    >
      <p>{toast.message}</p>
    </Toast>
  );
}
