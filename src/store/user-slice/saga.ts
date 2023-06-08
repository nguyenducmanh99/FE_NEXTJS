import { takeLatest, call, put } from "redux-saga/effects";
import Slice from ".";
import { PayloadAction } from "@reduxjs/toolkit";
import API from "@/services";
import { APP_LOGIN_URL, HttpStatus } from "@/constant";
import { AxiosError } from "axios";

function* userFlow(
  action: PayloadAction<{ type: string; payload: any }>,
): any {
  const { payload } = action;
  try {
    const response: any =  yield call(API.users, payload);
    if (response.status === HttpStatus.OK) {
      yield put({
        type: Slice.getUserSuccess.type,
        payload: response.data,
      });
    }
  } catch (error: AxiosError | any) {
    console.log("Error", error?.response.status)
    yield put({ type: Slice.getUserFail.type, payload: error?.response });
    if(error?.response.status == HttpStatus.UNAUTHORIZED && typeof window !== "undefined") {
       window.location.href= APP_LOGIN_URL;
    }
  }
}

function* userWatcher() {
  yield takeLatest(Slice.getUserRequest, userFlow);
}
export default userWatcher;