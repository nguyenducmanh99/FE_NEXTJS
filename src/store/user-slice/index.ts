import {
  RequestStatus,
} from "@/constant";
import { UserState } from "./types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState: UserState = {
  userStatus: RequestStatus.IDLE,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserRequest: (state, action: PayloadAction<any>) => {
      state.userStatus = RequestStatus.REQUESTING;
    },

    getUserSuccess: (state, action: PayloadAction<any>) => {
        state.userStatus = RequestStatus.SUCCESS;
        state.userDataRes = action.payload;
    },

    getUserFail: (state, action: PayloadAction<any>) => {
      state.userStatus = RequestStatus.ERROR;
    },
    
    resetUserStatus: (state) => {
      state.userStatus = RequestStatus.IDLE;
    },
  },
});

export default slice.actions;

export const useUserSlice = () => {
  return { actions: slice.actions };
};

export const UserReducer = slice.reducer;
