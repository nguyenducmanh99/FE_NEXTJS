import { LoginState } from "@/store/signin-slice/types";
import { UserState } from "./user-slice/types";
import { HistoryState } from "./history-slice/types";
export * from "@/store/signin-slice/types";
export interface RootReducer {
  authInfo: LoginState;
  userInfo: UserState;
  history: HistoryState;
}
