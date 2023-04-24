import { LoginState } from "@/store/signin-slice/types";
export * from "@/store/signin-slice/types";
export interface RootReducer {
  authInfo: LoginState;
}
