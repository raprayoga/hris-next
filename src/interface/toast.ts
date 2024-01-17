export interface ToastSliceState {
  isShow: boolean;
  type: "danger" | "green" | "white";
  message: string;
}
