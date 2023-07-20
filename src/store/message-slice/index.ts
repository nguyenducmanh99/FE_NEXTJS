import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IConversation, MessageState } from "./types";
import { RequestStatus } from "@/constant/enum";

export const initialState: MessageState = {
  open: false,
  connectStatus: RequestStatus.IDLE,
  disconnectStatus: RequestStatus.IDLE,
  conversationStatus: RequestStatus.IDLE,
};

const slice = createSlice({
  name: "message",
  initialState,
  reducers: {
    changeStatePopup: (state) => {
      state.open = !state.open;
    },

    connectSocketRequest: (state) => {
      state.connectStatus = RequestStatus.REQUESTING;
    },

    connectSocketSuccess: (state, action: PayloadAction<any>) => {
      state.connectStatus = RequestStatus.SUCCESS;
      state.disconnectStatus = RequestStatus.IDLE;
    },

    connectSocketFail: (state, action: PayloadAction<any>) => {
      state.connectStatus = RequestStatus.ERROR;
    },

    disconnectSocketRequest: (state) => {
      state.disconnectStatus = RequestStatus.REQUESTING;
    },

    disconnectSocketSuccess: (state, action: PayloadAction<any>) => {
      state.disconnectStatus = RequestStatus.SUCCESS;
      state.connectStatus = RequestStatus.IDLE;
    },

    disconnectSocketFail: (state, action: PayloadAction<any>) => {
      state.disconnectStatus = RequestStatus.ERROR;
    },

    getConversationRequest: (state) => {
      state.conversationStatus = RequestStatus.REQUESTING;
    },

    getConversationSuccess: (state, action: PayloadAction<IConversation[]>) => {
      state.conversationStatus = RequestStatus.SUCCESS;
      state.conversationData = action.payload;
    },

    getConversationFail: (state, action: PayloadAction<any>) => {
      state.conversationStatus = RequestStatus.ERROR;
    },

    resetConversationStatus: (state) => {
      state.conversationStatus = RequestStatus.IDLE;
    },
  },
});

export default slice.actions;

export const useMessageSlice = () => {
  return { actions: slice.actions };
};

export const MessageReducer = slice.reducer;
