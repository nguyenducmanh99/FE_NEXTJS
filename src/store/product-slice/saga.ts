import { takeLatest, call, put } from "redux-saga/effects";
import Slice from ".";
import { PayloadAction } from "@reduxjs/toolkit";
import API from "@/services";
import { HttpStatus } from "@/constant";
import { AxiosError } from "axios";

function* productFlow(
  action: PayloadAction<{ type: string; payload: any }>,
): any {
  const { payload } = action;
  try {
    const response: any = yield call(API.getProduct, payload);
    if (response.status === HttpStatus.OK) {
      yield put({
        type: Slice.getProductSuccess.type,
        payload: response.data,
      });
    }
  } catch (error: AxiosError | any) {
    console.log(error);
    yield put({ type: Slice.getProductFail.type, payload: error?.response });
  }
}

function* productWatcher() {
  yield takeLatest(Slice.getProductRequest, productFlow);
}
export default productWatcher;
