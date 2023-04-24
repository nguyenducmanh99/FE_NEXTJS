import { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";
import LoginSaga from "@/pages/auth/signin/slice/saga";

export default function* rootSaga(): SagaIterator {
  yield all([fork(LoginSaga)]);
}
