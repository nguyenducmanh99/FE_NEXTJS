import {
  AUTH_EMAIL,
  AUTH_INFO,
  AUTH_PASSWORD,
  AUTH_TOKEN,
  RequestStatus,
} from "@/constant";
import { LoginState } from "./types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

export const initialState: LoginState = {
  loginStatus: RequestStatus.IDLE,
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
      const { accessToken, expired, password, email, fullName } = action.payload;
      state.auth = { accessToken, expired };
      const cookies = new Cookies();
      cookies.set("token", accessToken, { path: '/' });

      window.localStorage.setItem(AUTH_TOKEN, JSON.stringify(accessToken));
      window.localStorage.setItem(AUTH_PASSWORD, JSON.stringify(password));
      window.localStorage.setItem(AUTH_EMAIL, JSON.stringify(email));
      window.localStorage.setItem(AUTH_INFO, JSON.stringify(state.userInfo));
    },

    loginFail: (state, action: PayloadAction<any>) => {
      state.loginStatus = RequestStatus.ERROR;
    },
    
    resetLoginStatus: (state) => {
      state.loginStatus = RequestStatus.IDLE;
    },

    authenticationDataRequest: (state, action: PayloadAction<any>) => {
      state.infoParty3rd = {...action.payload}
    },

    resetAuthentication: (state) => {
      state.infoParty3rd = undefined;
      window.localStorage.setItem(AUTH_TOKEN, JSON.stringify(''));
      window.localStorage.setItem(AUTH_PASSWORD, JSON.stringify(''));
      window.localStorage.setItem(AUTH_EMAIL, JSON.stringify(''));
    },

  },
});

export default slice.actions;

export const useLoginSlice = () => {
  return { actions: slice.actions };
};

export const LoginReducer = slice.reducer;
