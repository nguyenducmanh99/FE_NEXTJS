import { LoginState } from "@/pages/auth/signin/slice/types";
export * from "@/pages/auth/signin/slice/types";
export interface RootReducer {
  authInfo: LoginState;
}
