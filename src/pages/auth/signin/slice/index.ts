import {
  AUTH_EMAIL,
  AUTH_PASSWORD,
  AUTH_TOKEN,
  RequestStatus,
} from "@/constant";
import { LoginState } from "./types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState: LoginState = {
  loginStatus: RequestStatus.IDLE,
  userInfo: {},
  auth: {},
};

const slice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<any>) => {
      state.loginStatus = RequestStatus.REQUESTING;
    },

    loginSuccess: (state, action: PayloadAction<any>) => {
      state.loginStatus = RequestStatus.SUCCESS;
      state.userInfo = { ...action.payload };
      const { accessToken, expired, password, email } = action.payload;
      state.auth = { accessToken, expired };
      window.localStorage.setItem(AUTH_TOKEN, JSON.stringify(accessToken));
      window.localStorage.setItem(AUTH_PASSWORD, JSON.stringify(password));
      window.localStorage.setItem(AUTH_EMAIL, JSON.stringify(email));
    },

    loginFail: (state, action: PayloadAction<any>) => {
      state.loginStatus = RequestStatus.ERROR;
    },
  },
});

export default slice.actions;

export const useLoginSlice = () => {
  return { actions: slice.actions };
};

export const LoginReducer = slice.reducer;
