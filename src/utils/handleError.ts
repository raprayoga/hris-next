import { logout } from "@/store/auth";
import { useRouter } from "next/router";
import { Dispatch, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useHandleError() {
  const dispatch: Dispatch<any> = useDispatch();
  const router = useRouter();
  const [error, setError] = useState<any>({})

  useEffect(() => {
    if (error?.response?.status === 401) dispatch(logout());
    if (error?.response?.status === 403) router.push('/')
  }, [dispatch, error, router]);

  return {
    error,
    setError
  }
}