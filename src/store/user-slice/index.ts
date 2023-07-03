import { RequestStatus } from "@/constant";
import { UserState } from "./types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const initialState: UserState = {
  userStatus: RequestStatus.IDLE,
  createUserStatus: RequestStatus.IDLE,
  editUserStatus: RequestStatus.IDLE,
  deleteUserStatus: RequestStatus.IDLE,
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

    createUserRequest: (state, action: PayloadAction<any>) => {
      state.createUserStatus = RequestStatus.REQUESTING;
    },

    createUserSuccess: (state, action: PayloadAction<any>) => {
      state.createUserStatus = RequestStatus.SUCCESS;
      state.userCreateRes = action.payload;
      toast.success("Create user success");
    },

    createUserFail: (state, action: PayloadAction<any>) => {
      state.createUserStatus = RequestStatus.ERROR;
      toast.error(
        `${action.payload?.data?.message[0]}` || "Some thing is wrong",
      );
    },

    editUserRequest: (state, action: PayloadAction<any>) => {
      state.editUserStatus = RequestStatus.REQUESTING;
    },

    editUserSuccess: (state, action: PayloadAction<any>) => {
      state.editUserStatus = RequestStatus.SUCCESS;
    },

    editUserFail: (state, action: PayloadAction<any>) => {
      state.editUserStatus = RequestStatus.ERROR;
    },

    deleteUserRequest: (state, action: PayloadAction<any>) => {
      state.deleteUserStatus = RequestStatus.REQUESTING;
    },

    deleteUserSuccess: (state, action: PayloadAction<any>) => {
      state.deleteUserStatus = RequestStatus.SUCCESS;
    },

    deleteUserFail: (state, action: PayloadAction<any>) => {
      state.deleteUserStatus = RequestStatus.ERROR;
    },

    resetUserStatus: (state) => {
      state.userStatus = RequestStatus.IDLE;
      state.createUserStatus = RequestStatus.IDLE;
      state.editUserStatus = RequestStatus.IDLE;
      state.deleteUserStatus = RequestStatus.IDLE;
      state.userCreateRes = undefined;
    },
  },
});

export default slice.actions;

export const useUserSlice = () => {
  return { actions: slice.actions };
};

export const UserReducer = slice.reducer;
