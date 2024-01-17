import { getItemFromLocalStorage } from "@/utils/store";
import axios from "axios";
import { BASE_API_URL } from '@/utils'

const token = typeof window !== "undefined" ? getItemFromLocalStorage('token') : null

export default axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-type": "application/json",
    common: {
      Authorization: token ?? "",
    },
  },
});
