import { takeLatest, call, put } from "redux-saga/effects";
import Slice from ".";
import { io, Socket } from "socket.io-client";
import { APP_SOCKET_URL } from "@/constant";
import API from "@/services";

const url = APP_SOCKET_URL;
const socket = io(url);

const connect = async () => {
  await socket.connect();
};
const disconnect = async () => {
  await socket.disconnect();
};

function* connectSocket(): any {
  try {
    const response = yield call(connect);
    if (response.connected && response.id) {
      yield put({
        type: Slice.connectSocketSuccess.type,
        payload: response,
      });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: Slice.connectSocketFail.type, payload: error });
  }
}

function* disconnectSocket(): any {
  try {
    const response = yield call(disconnect);
    if (!response.connected) {
      yield put({
        type: Slice.disconnectSocketSuccess.type,
        payload: response,
      });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: Slice.disconnectSocketFail.type, payload: error });
  }
}

function* conversationFlow(): any {
  try {
    const response = yield call(API.conversation);
    console.log("dataSever", response);
    if (!response.connected) {
      yield put({
        type: Slice.getConversationSuccess.type,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: Slice.getConversationFail.type, payload: error });
  }
}

function* messageWatcher() {
  yield takeLatest(Slice.connectSocketRequest, connectSocket);
  yield takeLatest(Slice.disconnectSocketRequest, disconnectSocket);
  yield takeLatest(Slice.getConversationRequest, conversationFlow);
}
export default messageWatcher;
