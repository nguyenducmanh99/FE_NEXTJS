import { takeLatest, call, put } from "redux-saga/effects";
import Slice from ".";
import { PayloadAction } from "@reduxjs/toolkit";
import { ILoginForm } from "./types";
import API from "@/services";
import { HttpStatus } from "@/constant";
import { AxiosError } from "axios";

function* loginFlow(
  action: PayloadAction<{ type: string; payload: ILoginForm }>,
): any {
  const { payload } = action;
  try {
    const response: any = yield call(API.login, payload);
    if (response.status === HttpStatus.OK) {
      yield put({
        type: Slice.loginSuccess.type,
        payload: response.data,
      });
    }
  } catch (error: AxiosError | any) {
    console.log(error);
    yield put({ type: Slice.loginFail.type, payload: error?.response });
  }
}

function* loginWatcher() {
  yield takeLatest(Slice.loginRequest, loginFlow);
}
export default loginWatcher;
