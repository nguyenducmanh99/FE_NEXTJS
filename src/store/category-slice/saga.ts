import { takeLatest, call, put, takeEvery } from "redux-saga/effects";
import Slice from ".";
import { PayloadAction } from "@reduxjs/toolkit";
import API from "@/services";
import { HttpStatus } from "@/constant";
import { AxiosError } from "axios";

function* categoryFlow(
  action: PayloadAction<{ type: string; payload: any }>,
): any {
  const { payload } = action;
  try {
    const response: any = yield call(API.getCategory, payload);
    if (response.status === HttpStatus.OK) {
      yield put({
        type: Slice.getCategorySuccess.type,
        payload: response.data,
      });
    }
  } catch (error: AxiosError | any) {
    console.log(error);
    yield put({ type: Slice.getCategoryFail.type, payload: error?.response });
  }
}

function* categoryWatcher() {
  yield takeLatest(Slice.getCategoryRequest, categoryFlow);
}
export default categoryWatcher;
