import { takeLatest, call, put } from "redux-saga/effects";
import Slice from ".";
import { PayloadAction } from "@reduxjs/toolkit";
import API from "@/services";
import { HttpStatus } from "@/constant";
import { AxiosError } from "axios";

function* userFlow(action: PayloadAction<{ type: string; payload: any }>): any {
  const { payload } = action;
  try {
    const response: any = yield call(API.users, payload);
    if (response.status === HttpStatus.OK) {
      yield put({
        type: Slice.getUserSuccess.type,
        payload: response.data,
      });
    }
  } catch (error: AxiosError | any) {
    yield put({ type: Slice.getUserFail.type, payload: error?.response });
  }
}

function* createUserFlow(
  action: PayloadAction<{ type: string; payload: any }>,
): any {
  const { payload } = action;
  try {
    const response: any = yield call(API.createUser, payload);
    if (response.status === HttpStatus.CREATED) {
      yield put({
        type: Slice.createUserSuccess.type,
        payload: response.data,
      });
    }
  } catch (error: AxiosError | any) {
    yield put({ type: Slice.createUserFail.type, payload: error?.response });
  }
}

function* userWatcher() {
  yield takeLatest(Slice.getUserRequest, userFlow);
  yield takeLatest(Slice.createUserRequest, createUserFlow);
}
export default userWatcher;
