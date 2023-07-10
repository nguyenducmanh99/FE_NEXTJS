import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MessageState } from "./types";

export const initialState: MessageState = {
  open: false,
};

const slice = createSlice({
  name: "message",
  initialState,
  reducers: {
    changeStatePopup: (state) => {
      state.open = !state.open
    },
  },
});

export default slice.actions;

export const useMessageSlice = () => {
  return { actions: slice.actions };
};

export const MessageReducer = slice.reducer;
