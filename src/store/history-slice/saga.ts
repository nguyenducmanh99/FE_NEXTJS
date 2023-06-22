import { takeLatest, call, put } from "redux-saga/effects";
import Slice from ".";
import { PayloadAction } from "@reduxjs/toolkit";
import API from "@/services";
import { HttpStatus } from "@/constant";
import { AxiosError } from "axios";

function* getHistoryFlow(
  action: PayloadAction<{ type: string; payload: any }>,
): any {
  const { payload } = action;
  try {
    const response: any =  yield call(API.getHistory, payload);
    if (response.status === HttpStatus.OK) {
      yield put({
        type: Slice.getHistorySuccess.type,
        payload: response.data,
      });
    }
  } catch (error: AxiosError | any) {
    yield put({ type: Slice.getHistoryFail.type, payload: error?.response });
  }
}

function* createHistoryFlow(
  action: PayloadAction<{ type: string; payload: any }>,
): any {
  const { payload } = action;
  try {
    const response: any = yield call(API.saveLog, payload);
    if (response.status === HttpStatus.CREATED) {
      yield put({
        type: Slice.createHistorySuccess.type,
        payload: response.data,
      });
    }
  } catch (error: AxiosError | any) {
    yield put({ type: Slice.createHistoryFail.type, payload: error?.response });
  }
}

function* historyWatcher() {
  yield takeLatest(Slice.getHistoryRequest, getHistoryFlow);
  yield takeLatest(Slice.createHistoryRequest, createHistoryFlow);
}
export default historyWatcher;
