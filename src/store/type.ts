import { LoginState } from "@/store/signin-slice/types";
import { UserState } from "./user-slice/types";
export * from "@/store/signin-slice/types";
export interface RootReducer {
  authInfo: LoginState;
  userInfo: UserState;
}
