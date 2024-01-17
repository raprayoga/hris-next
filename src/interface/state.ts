import { AuthSliceState, RegistSliceState } from "./auth";
import { ToastSliceState } from "./toast";
import { ProfileSliceState } from "./user";

export interface sliceState {
  auth: AuthSliceState;
  toast: ToastSliceState;
  regist: RegistSliceState;
  user: ProfileSliceState;
}
