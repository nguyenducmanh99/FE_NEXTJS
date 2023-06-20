import { RequestStatus } from "@/constant";
import { HistoryState } from "./types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState: HistoryState = {
  historyStatus: RequestStatus.IDLE,
  createHistoryStatus: RequestStatus.IDLE,
};

const slice = createSlice({
  name: "history",
  initialState,
  reducers: {
    getHistoryRequest: (state, action: PayloadAction<any>) => {
      state.historyStatus = RequestStatus.REQUESTING;
    },

    getHistorySuccess: (state, action: PayloadAction<any>) => {
      state.historyStatus = RequestStatus.SUCCESS;
    },

    getHistoryFail: (state, action: PayloadAction<any>) => {
      state.historyStatus = RequestStatus.ERROR;
    },

    createHistoryRequest: (state, action: PayloadAction<any>) => {
      state.createHistoryStatus = RequestStatus.REQUESTING;
    },

    createHistorySuccess: (state, action: PayloadAction<any>) => {
      state.createHistoryStatus = RequestStatus.SUCCESS;
    },

    createHistoryFail: (state, action: PayloadAction<any>) => {
      state.createHistoryStatus = RequestStatus.ERROR;
    },

    resetHistoryStatus: (state) => {
      state.historyStatus = RequestStatus.IDLE;
      state.createHistoryStatus = RequestStatus.IDLE;
    },
  },
});

export default slice.actions;

export const useHistorySlice = () => {
  return { actions: slice.actions };
};

export const HistoryReducer = slice.reducer;
